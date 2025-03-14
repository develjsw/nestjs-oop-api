import { EntityManager } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';

export interface OrderQueryRepositoryInterface {
    findOrderById(id: number, manager?: EntityManager): Promise<OrderEntity | null>;
}
