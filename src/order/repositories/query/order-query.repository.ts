import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { OrderEntity } from '../../entities/order.entity';
import { OrderQueryRepositoryInterface } from '../../interfaces/order-query-repository.interface';

@Injectable()
export class OrderQueryRepository implements OrderQueryRepositoryInterface {
    private readonly orderRepository: Repository<OrderEntity>;

    constructor(private readonly dataSource: DataSource) {
        this.orderRepository = this.dataSource.getRepository(OrderEntity);
    }

    async findOrderById(orderId: number, manager?: EntityManager): Promise<OrderEntity | null> {
        const currentRepository: Repository<OrderEntity> = manager
            ? manager.getRepository(OrderEntity)
            : this.orderRepository;

        return await currentRepository.findOne({ where: { orderId } });
    }
}
