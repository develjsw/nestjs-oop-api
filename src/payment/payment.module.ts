import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './services/payment.service';
import { PaymentTransactionService } from './services/payment-transaction.service';
import { PaymentRepository } from './repositories/payment.repository';

@Module({
    imports: [],
    controllers: [PaymentController],
    providers: [PaymentService, PaymentRepository, PaymentTransactionService],
    exports: [PaymentRepository]
})
export class PaymentModule {}
