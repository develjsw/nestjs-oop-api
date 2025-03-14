import { Injectable } from '@nestjs/common';
import { EntityManager, InsertResult, Repository } from 'typeorm';
import { OrderEntity } from '../../entities/order.entity';
import { OrderCommandRepositoryInterface } from '../../interfaces/command/order-command-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderCommandRepository implements OrderCommandRepositoryInterface {
    constructor(
        @InjectRepository(OrderEntity, 'master-db')
        private readonly orderRepository: Repository<OrderEntity>
    ) {}

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
