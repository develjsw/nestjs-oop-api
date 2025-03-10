import { OrderEntity } from '../entities/order.entity';
import { EntityManager } from 'typeorm';

export interface OrderRepositoryInterface {
    createOrder(order: Partial<OrderEntity>, manager?: EntityManager): Promise<number>;
    findOrderById(id: number, manager?: EntityManager): Promise<OrderEntity | null>;
    updateOrderById(id: number, order: Partial<OrderEntity>, manager?: EntityManager): Promise<void>;
}
