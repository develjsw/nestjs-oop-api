import { OrderEntity } from '../../entity/order.entity';
import { EntityManager } from 'typeorm';

export interface OrderCommandRepositoryInterface {
    createOrder(order: Partial<OrderEntity>, manager?: EntityManager): Promise<number>;
    updateOrderById(id: number, order: Partial<OrderEntity>, manager?: EntityManager): Promise<void>;
}
