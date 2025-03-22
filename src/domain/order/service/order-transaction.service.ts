import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { OrderEntity } from '../entity/order.entity';
import { OrderDetailEntity } from '../../order-detail/entity/order-detail.entity';
import { GoodsEntity } from '../../goods/entity/goods.entity';
import { OrderStatusType } from '../../../shared/type/order-status.type';
import { PaymentStatusType } from '../../../shared/type/payment-status.type';
import { OrderCommandRepository } from '../repository/command/order-command.repository';
import { GoodsQueryRepository } from '../../goods/repository/query/goods-query.repository';
import { OrderDetailCommandRepository } from '../../order-detail/repository/command/order-detail-command.repository';
import { PaymentCommandRepository } from '../../payment/repository/command/payment-command.repository';
import { InjectEntityManager } from '@nestjs/typeorm';

@Injectable()
export class OrderTransactionService {
    constructor(
        @InjectEntityManager('master-db')
        private readonly masterEntityManager: EntityManager,

        /*
            [ Slave DB의 별도 커넥션을 주입받을 필요가 없는 이유 ]

            - 트랜잭션 내에서 실행되는 모든 `SELECT`는 Master DB에서 실행되어야 함
                → 이유: 트랜잭션 내에서 실행되는 `SELECT`는 최신 데이터 일관성을 보장해야 하므로, Master DB에서만 조회 가능
                → Slave DB의 Replication Lag(복제 지연)으로 인해, 트랜잭션 내에서 최신 데이터가 보장되지 않을 수 있음

            - 트랜잭션 외부에서 실행되는 `SELECT`는 Slave DB에서 실행 가능
                → 이유: 트랜잭션이 종료된 후, Master의 데이터가 Slave에 복제될 시간이 있기 때문
                → 즉, 트랜잭션 종료 후 조회하는 `SELECT`는 Slave DB에서 실행해도 괜찮음

            - 따라서, 트랜잭션 내에서 `SELECT`가 필요한 경우에는 Master DB를 바라보게 하여 데이터의 최신성과 일관성을 보장함
        */
        // @InjectEntityManager('slave-db')
        // private readonly slaveEntityManager: EntityManager,

        private readonly goodsQueryRepository: GoodsQueryRepository,
        private readonly orderCommandRepository: OrderCommandRepository,
        private readonly orderDetailCommandRepository: OrderDetailCommandRepository,
        private readonly paymentCommandRepository: PaymentCommandRepository
    ) {}

    /*
        Transaction 내에서 외부 모듈의 DB 작업을 수행해야 하는 상황
            - Transaction 내에서 여러 도메인(Order, Payment 등)의 데이터를 처리해야 하므로, 하나의 서비스에서 여러 모듈의 DB 작업을 수행해야 함
              (=어쩔 수 없는 결합도 발생)

        Service vs Repository 주입 고민
            1. Service 주입
                - Service의 내부 비즈니스 로직이 변경되면, 이 Transaction에도 영향을 미칠 가능성이 있음
                - 즉, Service 내부 구현이 변경되면 Transaction 흐름이 깨질 가능성이 큼

            2. Repository 주입
                - Repository는 일반적으로 변경이 적고, 도메인 간 결합도를 최소화할 수 있음
                - 다른 모듈의 Repository를 직접 주입받더라도, Service에 비해 의존성이 낮음

        별도의 공통 Transaction 모듈을 만들지 않은 이유
            - Transaction 처리를 독립적인 모듈로 분리하면 유지보수는 편해지지만, 모듈 규모가 커져서 별도의 API로 분리(MSA)할 경우 관리가 어려울 수 있음
            - 따라서, 현재 구조에서는 Transaction 관리가 필요한 Service내에서 처리하는 것이 더 적절하다고 판단함
    */
    async createOrderWithDetailAndPayment(
        order: Partial<Omit<OrderEntity, 'orderId'>>,
        orderDetails: Partial<Omit<OrderDetailEntity, 'orderDetailId'>>[]
    ): Promise<void> {
        /*
            외부에서 사용될 조회쿼리로 별도의 manager(=connection)을 매개변수로 보내고 있지 않기 때문에
            GoodsQueryRepository에 설정한 @InjectRepository(GoodsEntity, 'slave-db')로 인해 디폴트는 slave-db를 바라봄

            만약, 조회쿼리가 transaction 내에서 동작되야 할 경우에는 manager를 보내줘서 master-db를 바라볼 수 있도록 만들어주면 됨
        */
        const goods: GoodsEntity[] = await this.goodsQueryRepository.findGoodsByIds(
            orderDetails.map((orderDetails: OrderDetailEntity) => orderDetails.goodsId)
        );

        const totalPrice: number = goods.reduce((acc: number, cur: GoodsEntity): number => acc + cur.price, 0);

        await this.masterEntityManager.transaction(async (manager: EntityManager) => {
            const orderId: number = await this.orderCommandRepository.createOrder(
                { totalPrice, orderStatus: OrderStatusType.COMPLETE, ...order },
                manager
            );
            if (!orderId) {
                throw new InternalServerErrorException('주문 생성에 실패했습니다.');
            }

            // 상품가격을 orderDetail에도 저장하는 이유 - 해당 시점의 상품가격 보존을 위해
            const goodsMap = new Map(goods.map(({ goodsId, price }) => [goodsId, price]));

            const orderDetailInstances: OrderDetailEntity[] = orderDetails.map((orderDetail: OrderDetailEntity) => {
                return {
                    goodsPrice: goodsMap.get(orderDetail.goodsId) ?? 0,
                    orderId,
                    ...orderDetail
                };
            });

            const orderDetailIds: number[] = await this.orderDetailCommandRepository.createOrderDetails(
                orderDetailInstances,
                manager
            );

            if (!orderDetailIds.length) {
                throw new InternalServerErrorException('주문상세 생성에 실패했습니다.');
            }

            await this.paymentCommandRepository.createPayment(
                { orderId, amount: totalPrice, paymentStatus: PaymentStatusType.PENDING },
                manager
            );
        });
    }
}
