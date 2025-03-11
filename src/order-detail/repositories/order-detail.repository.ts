import { Injectable } from '@nestjs/common';
import { OrderDetailRepositoryInterface } from '../interfaces/order-detail-repository.interface';
import { OrderDetailEntity } from '../entities/order-detail.entity';
import { DataSource, EntityManager, InsertResult, Repository } from 'typeorm';

@Injectable()
export class OrderDetailRepository implements OrderDetailRepositoryInterface {
    private readonly orderDetailRepository: Repository<OrderDetailEntity>;

    constructor(private readonly dataSource: DataSource) {
        this.orderDetailRepository = this.dataSource.getRepository(OrderDetailEntity);
    }

    async createOrderDetails(
        orderDetails: Partial<Omit<OrderDetailEntity, 'orderDetailId'>>[],
        manager?: EntityManager
    ): Promise<number[]> {
        const currentRepository: Repository<OrderDetailEntity> = manager
            ? manager.getRepository(OrderDetailEntity)
            : this.orderDetailRepository;

        const insertResult: InsertResult = await currentRepository.insert(orderDetails);

        return insertResult?.identifiers.length ? insertResult.identifiers.map((ids) => ids.orderDetailId) : [];
    }
}
