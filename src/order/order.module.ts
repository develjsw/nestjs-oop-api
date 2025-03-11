import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './services/order.service';
import { OrderRepository } from './repositories/order.repository';
import { OrderTransactionService } from './services/order-transaction.service';
import { GoodsModule } from '../goods/goods.module';
import { OrderDetailModule } from '../order-detail/order-detail.module';
import { PaymentModule } from '../payment/payment.module';

@Module({
    imports: [GoodsModule, OrderDetailModule, PaymentModule],
    controllers: [OrderController],
    providers: [OrderService, OrderRepository, OrderTransactionService],
    exports: []
})
export class OrderModule {}
