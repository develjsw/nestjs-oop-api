import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, InsertResult, Repository } from 'typeorm';
import { OrderDetailEntity } from '../../entities/order-detail.entity';
import { OrderDetailCommandRepositoryInterface } from '../../interfaces/command/order-detail-command-repository.interface';

@Injectable()
export class OrderDetailCommandRepository implements OrderDetailCommandRepositoryInterface {
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
