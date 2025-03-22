import { Injectable } from '@nestjs/common';
import { EntityManager, InsertResult, Repository } from 'typeorm';
import { PaymentEntity } from '../../entity/payment.entity';
import { PaymentCommandRepositoryInterface } from '../../interface/command/payment-command-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PaymentCommandRepository implements PaymentCommandRepositoryInterface {
    constructor(
        @InjectRepository(PaymentEntity, 'master-db')
        private readonly paymentRepository: Repository<PaymentEntity>
    ) {}

    async createPayment(payment: Partial<Omit<PaymentEntity, 'paymentId'>>, manager?: EntityManager): Promise<number> {
        const currentRepository: Repository<PaymentEntity> = manager
            ? manager.getRepository(PaymentEntity)
            : this.paymentRepository;

        const insertResult: InsertResult = await currentRepository.insert(payment);

        return insertResult?.raw?.insertId || 0;
    }
}
