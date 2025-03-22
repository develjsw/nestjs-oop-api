import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { OrderEntity } from '../../entity/order.entity';
import { OrderQueryRepositoryInterface } from '../../interface/query/order-query-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderQueryRepository implements OrderQueryRepositoryInterface {
    constructor(
        @InjectRepository(OrderEntity, 'slave-db')
        private readonly orderRepository: Repository<OrderEntity>
    ) {}

    async findOrderById(orderId: number, manager?: EntityManager): Promise<OrderEntity | null> {
        const currentRepository: Repository<OrderEntity> = manager
            ? manager.getRepository(OrderEntity)
            : this.orderRepository;

        return await currentRepository.findOne({ where: { orderId } });
    }
}
