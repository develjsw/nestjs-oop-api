import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderEntity } from '../entities/order.entity';
import { OrderServiceInterface } from '../interfaces/order-service.interface';
import { OrderCommandRepository } from '../repositories/command/order-command.repository';
import { OrderQueryRepository } from '../repositories/query/order-query.repository';

@Injectable()
export class OrderService implements OrderServiceInterface {
    constructor(
        private readonly orderCommandRepository: OrderCommandRepository,
        private readonly orderQueryRepository: OrderQueryRepository
    ) {}

    async createOrder(order: Partial<OrderEntity>): Promise<number> {
        return await this.orderCommandRepository.createOrder(order);
    }

    async findOrderById(orderId: number): Promise<OrderEntity | null> {
        const order: OrderEntity = await this.orderQueryRepository.findOrderById(orderId);
        if (!order) {
            throw new NotFoundException('주문 정보를 찾을 수 없습니다.');
        }

        return order;
    }

    async updateOrderById(orderId: number, order: OrderEntity): Promise<void> {
        await this.orderCommandRepository.updateOrderById(orderId, order);
    }
}
