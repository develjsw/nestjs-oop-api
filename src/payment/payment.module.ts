import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './services/payment.service';
import { PaymentTransactionService } from './services/payment-transaction.service';

@Module({
    imports: [],
    controllers: [PaymentController],
    providers: [PaymentService, PaymentTransactionService],
    exports: []
})
export class PaymentModule {}
