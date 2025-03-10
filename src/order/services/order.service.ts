import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderEntity } from '../entities/order.entity';
import { OrderServiceInterface } from '../interfaces/order-service.interface';
import { OrderRepository } from '../repositories/order.repository';

@Injectable()
export class OrderService implements OrderServiceInterface {
    constructor(private readonly orderRepository: OrderRepository) {}

    async createOrder(order: Partial<OrderEntity>): Promise<number> {
        return await this.orderRepository.createOrder(order);
    }

    async findOrderById(orderId: number): Promise<OrderEntity | null> {
        const order: OrderEntity = await this.orderRepository.findOrderById(orderId);
        if (!order) {
            throw new NotFoundException('주문 정보를 찾을 수 없습니다.');
        }

        return order;
    }

    async updateOrderById(orderId: number, order: OrderEntity): Promise<void> {
        await this.orderRepository.updateOrderById(orderId, order);
    }
}
