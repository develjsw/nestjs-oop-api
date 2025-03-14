import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './services/payment.service';
import { PaymentTransactionService } from './services/payment-transaction.service';
import { PaymentRepository } from './repositories/payment.repository';

@Module({
    imports: [],
    controllers: [PaymentController],
    providers: [PaymentService, PaymentRepository, PaymentTransactionService],
    // order-transaction.service에서 사용 될 목적으로 반환
    exports: [PaymentRepository]
})
export class PaymentModule {}
