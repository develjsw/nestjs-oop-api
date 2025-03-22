import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './service/payment.service';
import { PaymentTransactionService } from './service/payment-transaction.service';
import { PaymentCommandRepository } from './repository/command/payment-command.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from './entity/payment.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([PaymentEntity], 'master-db'),
        TypeOrmModule.forFeature([PaymentEntity], 'slave-db')
    ],
    controllers: [PaymentController],
    providers: [PaymentService, PaymentTransactionService, PaymentCommandRepository],
    // order-transaction.service에서 사용 될 목적으로 반환
    exports: [PaymentCommandRepository]
})
export class PaymentModule {}
