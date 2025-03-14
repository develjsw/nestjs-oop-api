import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, InsertResult, Repository } from 'typeorm';
import { PaymentEntity } from '../../entities/payment.entity';
import { PaymentCommandRepositoryInterface } from '../../interfaces/command/payment-command-repository.interface';

@Injectable()
export class PaymentCommandRepository implements PaymentCommandRepositoryInterface {
    private readonly paymentRepository: Repository<PaymentEntity>;

    constructor(private readonly dataSource: DataSource) {
        this.paymentRepository = this.dataSource.getRepository(PaymentEntity);
    }

    async createPayment(payment: Partial<Omit<PaymentEntity, 'paymentId'>>, manager?: EntityManager): Promise<number> {
        const currentRepository: Repository<PaymentEntity> = manager
            ? manager.getRepository(PaymentEntity)
            : this.paymentRepository;

        const insertResult: InsertResult = await currentRepository.insert(payment);

        return insertResult?.raw?.insertId || 0;
    }
}
