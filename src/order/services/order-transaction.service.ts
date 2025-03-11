import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { OrderRepository } from '../repositories/order.repository';
import { PaymentRepository } from '../../payment/repositories/payment.repository';
import { OrderEntity } from '../entities/order.entity';
import { OrderDetailEntity } from '../../order-detail/entities/order-detail.entity';
import { OrderDetailRepository } from '../../order-detail/repositories/order-detail.repository';
import { GoodsRepository } from '../../goods/repositories/goods.repository';
import { GoodsEntity } from '../../goods/entities/goods.entity';

@Injectable()
export class OrderTransactionService {
    constructor(
        private readonly dataSource: DataSource,
        private readonly goodsRepository: GoodsRepository,
        private readonly orderRepository: OrderRepository,
        private readonly orderDetailRepository: OrderDetailRepository,
        private readonly paymentRepository: PaymentRepository
    ) {}

    async createOrderWithDetailAndPayment(
        order: Partial<Omit<OrderEntity, 'orderId'>>,
        orderDetails: Partial<Omit<OrderDetailEntity, 'orderDetailId'>>[]
    ): Promise<void> {
        await this.dataSource.transaction(async (manager: EntityManager) => {
            const goods: GoodsEntity[] = await this.goodsRepository.findGoodsByIds(
                orderDetails.map((orderDetails: OrderDetailEntity) => orderDetails.goodsId),
                manager
            );

            const totalPrice: number = goods.reduce((acc: number, cur: GoodsEntity): number => acc + cur.price, 0);

            const orderId: number = await this.orderRepository.createOrder(
                { totalPrice, orderStatus: 'COMPLETE', ...order }, // TODO : 상태값 Enum 관리필요
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

            const orderDetailIds: number[] = await this.orderDetailRepository.createOrderDetails(
                orderDetailInstances,
                manager
            );

            if (!orderDetailIds.length) {
                throw new InternalServerErrorException('주문상세 생성에 실패했습니다.');
            }

            await this.paymentRepository.createPayment({ orderId, paymentStatus: 'PENDING' }); // TODO : 상태값 Enum 관리필요
        });
    }
}
