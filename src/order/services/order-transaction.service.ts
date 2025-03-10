import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { OrderRepository } from '../repositories/order.repository';
import { PaymentRepository } from '../../payment/repositories/payment.repository';
import { OrderEntity } from '../entities/order.entity';
import { PaymentEntity } from '../../payment/entities/payment.entity';

@Injectable()
export class OrderTransactionService {
    constructor(
        private readonly dataSource: DataSource,
        private readonly orderRepository: OrderRepository,
        private readonly paymentRepository: PaymentRepository
    ) {}

    async createOrderAndPayment(
        order: Partial<Omit<OrderEntity, 'orderId'>>,
        payment: Partial<Omit<PaymentEntity, 'paymentId'>>
    ): Promise<void> {
        await this.dataSource.transaction(async (manager: EntityManager) => {
            const orderId: number = await this.orderRepository.createOrder(order, manager);

            if (!orderId) {
                throw new InternalServerErrorException('주문 생성에 실패했습니다.');
            }

            await this.paymentRepository.createPayment({ orderId, ...payment }, manager);
        });
    }
}
