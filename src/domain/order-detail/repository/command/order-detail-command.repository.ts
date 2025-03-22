import { Injectable } from '@nestjs/common';
import { EntityManager, InsertResult, Repository } from 'typeorm';
import { OrderDetailEntity } from '../../entity/order-detail.entity';
import { OrderDetailCommandRepositoryInterface } from '../../interface/command/order-detail-command-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderDetailCommandRepository implements OrderDetailCommandRepositoryInterface {
    constructor(
        @InjectRepository(OrderDetailEntity, 'master-db')
        private readonly orderDetailRepository: Repository<OrderDetailEntity>
    ) {}

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
