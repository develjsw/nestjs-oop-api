import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoodsModule } from './goods/goods.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { OrderDetailModule } from './order-detail/order-detail.module';
import { CommonModule } from './common/common.module';
import * as path from 'path';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { CacheModule } from './cache/cache.module';
import { ExceptionModule } from './exception/exception.module';

let envFile = 'env.local';
switch (process.env.NODE_ENV) {
    case 'production':
        envFile = 'env.production';
        break;
    case 'development':
        envFile = 'env.development';
        break;
}

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [path.resolve(__dirname, `../${envFile}`)],
            isGlobal: true,
            cache: true
        }),
        DatabaseModule,
        CacheModule,
        ExceptionModule,
        GoodsModule,
        OrderModule,
        OrderDetailModule,
        PaymentModule,
        CommonModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
