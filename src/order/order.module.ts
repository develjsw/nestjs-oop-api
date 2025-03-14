import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './services/order.service';
import { OrderTransactionService } from './services/order-transaction.service';
import { GoodsModule } from '../goods/goods.module';
import { OrderDetailModule } from '../order-detail/order-detail.module';
import { PaymentModule } from '../payment/payment.module';
import { OrderCommandRepository } from './repositories/command/order-command.repository';
import { OrderQueryRepository } from './repositories/query/order-query.repository';

@Module({
    // 모듈간 의존성 발생
    imports: [GoodsModule, OrderDetailModule, PaymentModule],
    controllers: [OrderController],
    providers: [OrderService, OrderTransactionService, OrderCommandRepository, OrderQueryRepository],
    exports: []
})
export class OrderModule {}
