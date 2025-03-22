import { EntityManager } from 'typeorm';
import { OrderEntity } from '../../entity/order.entity';

export interface OrderQueryRepositoryInterface {
    findOrderById(id: number, manager?: EntityManager): Promise<OrderEntity | null>;
}
