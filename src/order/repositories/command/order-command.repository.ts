import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, InsertResult, Repository } from 'typeorm';
import { OrderEntity } from '../../entities/order.entity';
import { OrderCommandRepositoryInterface } from '../../interfaces/command/order-command-repository.interface';

@Injectable()
export class OrderCommandRepository implements OrderCommandRepositoryInterface {
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
