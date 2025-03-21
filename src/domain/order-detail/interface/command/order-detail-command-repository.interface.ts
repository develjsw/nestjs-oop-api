import { OrderDetailEntity } from '../../entity/order-detail.entity';
import { EntityManager } from 'typeorm';

export interface OrderDetailCommandRepositoryInterface {
    createOrderDetails(orderDetails: Partial<OrderDetailEntity>[], manager?: EntityManager): Promise<number[]>;
}
