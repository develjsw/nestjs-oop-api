import { OrderDetailEntity } from '../entities/order-detail.entity';
import { EntityManager } from 'typeorm';

export interface OrderDetailRepositoryInterface {
    createOrderDetails(orderDetails: Partial<OrderDetailEntity>[], manager?: EntityManager): Promise<number[]>;
}
