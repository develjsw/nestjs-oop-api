import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './service/order.service';
import { OrderTransactionService } from './service/order-transaction.service';
import { GoodsModule } from '../goods/goods.module';
import { OrderDetailModule } from '../order-detail/order-detail.module';
import { PaymentModule } from '../payment/payment.module';
import { OrderCommandRepository } from './repository/command/order-command.repository';
import { OrderQueryRepository } from './repository/query/order-query.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entity/order.entity';

@Module({
    imports: [
        GoodsModule,
        OrderDetailModule,
        PaymentModule,
        TypeOrmModule.forFeature([OrderEntity], 'master-db'),
        TypeOrmModule.forFeature([OrderEntity], 'slave-db')
    ],
    controllers: [OrderController],
    providers: [OrderService, OrderTransactionService, OrderCommandRepository, OrderQueryRepository],
    exports: []
})
export class OrderModule {}
