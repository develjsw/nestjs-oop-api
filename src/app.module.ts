import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoodsModule } from './goods/goods.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';

@Module({
    imports: [GoodsModule, OrderModule, PaymentModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
