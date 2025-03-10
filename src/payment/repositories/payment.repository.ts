import { Injectable } from '@nestjs/common';
import { PaymentRepositoryInterface } from '../interfaces/payment-repository.interface';
import { PaymentEntity } from '../entities/payment.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';

@Injectable()
export class PaymentRepository implements PaymentRepositoryInterface {
    private readonly paymentRepository: Repository<PaymentEntity>;

    constructor(private readonly dataSource: DataSource) {
        this.paymentRepository = this.dataSource.getRepository(PaymentEntity);
    }

    async createPayment(payment: Partial<Omit<PaymentEntity, 'paymentId'>>, manager?: EntityManager): Promise<void> {
        const currentRepository: Repository<PaymentEntity> = manager
            ? manager.getRepository(PaymentEntity)
            : this.paymentRepository;

        await currentRepository.insert(payment);
    }
}
