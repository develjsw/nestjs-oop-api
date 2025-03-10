import { OrderEntity } from '../entities/order.entity';

export interface OrderServiceInterface {
    createOrder(order: Partial<OrderEntity>): Promise<number>;
    findOrderById(id: number): Promise<OrderEntity | null>;
    updateOrderById(id: number, order: Partial<OrderEntity>): Promise<void>;
}
