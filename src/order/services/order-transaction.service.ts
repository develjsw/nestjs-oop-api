import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';
import { OrderDetailEntity } from '../../order-detail/entities/order-detail.entity';
import { GoodsEntity } from '../../goods/entities/goods.entity';
import { OrderStatusType } from '../../common/type/order-status.type';
import { PaymentStatusType } from '../../common/type/payment-status.type';
import { OrderCommandRepository } from '../repositories/command/order-command.repository';
import { GoodsQueryRepository } from '../../goods/repositories/query/goods-query.repository';
import { OrderDetailCommandRepository } from '../../order-detail/repositories/command/order-detail-command.repository';
import { PaymentCommandRepository } from '../../payment/repositories/command/payment-command.repository';

@Injectable()
export class OrderTransactionService {
    constructor(
        private readonly dataSource: DataSource,
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
        await this.dataSource.transaction(async (manager: EntityManager) => {
            const goods: GoodsEntity[] = await this.goodsQueryRepository.findGoodsByIds(
                orderDetails.map((orderDetails: OrderDetailEntity) => orderDetails.goodsId),
                manager
            );

            const totalPrice: number = goods.reduce((acc: number, cur: GoodsEntity): number => acc + cur.price, 0);

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
