import { PaymentEntity } from '../../entities/payment.entity';
import { EntityManager } from 'typeorm';

export interface PaymentCommandRepositoryInterface {
    createPayment(payment: Partial<Omit<PaymentEntity, 'paymentId'>>, manager?: EntityManager): Promise<number>;
}
