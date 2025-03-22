import { OrderEntity } from '../entity/order.entity';

export interface OrderServiceInterface {
    createOrder(order: Partial<OrderEntity>): Promise<number>;
    findOrderById(id: number): Promise<OrderEntity | null>;
    updateOrderById(id: number, order: Partial<OrderEntity>): Promise<void>;
}
