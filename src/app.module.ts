import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as path from 'path';
import { GoodsModule } from './domain/goods/goods.module';
import { OrderModule } from './domain/order/order.module';
import { PaymentModule } from './domain/payment/payment.module';
import { OrderDetailModule } from './domain/order-detail/order-detail.module';
import { CommonModule } from './shared/common/common.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infra/database/database.module';
import { CacheModule } from './infra/cache/cache.module';
import { ExceptionModule } from './shared/exception/exception.module';

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
