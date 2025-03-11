import { Injectable } from '@nestjs/common';
import { OrderRepositoryInterface } from '../interfaces/order-repository.interface';
import { OrderEntity } from '../entities/order.entity';
import { DataSource, EntityManager, InsertResult, Repository } from 'typeorm';

@Injectable()
export class OrderRepository implements OrderRepositoryInterface {
    private readonly orderRepository: Repository<OrderEntity>;

    constructor(private readonly dataSource: DataSource) {
        this.orderRepository = this.dataSource.getRepository(OrderEntity);
    }

    async createOrder(order: Partial<Omit<OrderEntity, 'orderId'>>, manager?: EntityManager): Promise<number> {
        const currentRepository: Repository<OrderEntity> = manager
            ? manager.getRepository(OrderEntity)
            : this.orderRepository;

        const insertResult: InsertResult = await currentRepository.insert(order);

        return insertResult?.raw?.insertId || 0;
    }

    async findOrderById(orderId: number, manager?: EntityManager): Promise<OrderEntity | null> {
        const currentRepository: Repository<OrderEntity> = manager
            ? manager.getRepository(OrderEntity)
            : this.orderRepository;

        return await currentRepository.findOne({ where: { orderId } });
    }

    async updateOrderById(
        orderId: number,
        order: Partial<Omit<OrderEntity, 'orderId'>>,
        manager?: EntityManager
    ): Promise<void> {
        const currentRepository: Repository<OrderEntity> = manager
            ? manager.getRepository(OrderEntity)
            : this.orderRepository;

        await currentRepository.update({ orderId }, order);
    }
}
