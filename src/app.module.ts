import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoodsModule } from './goods/goods.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { OrderDetailModule } from './order-detail/order-detail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            name: 'master-db',
            type: 'mysql',
            host: '127.0.0.1',
            port: 3306,
            username: 'root',
            password: 'develjsw1993!@',
            database: 'oop',
            entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
            logging: ['error', 'warn', 'info', 'log'],
            synchronize: false
        }),
        TypeOrmModule.forRoot({
            name: 'slave-db',
            type: 'mysql',
            host: '127.0.0.1',
            port: 3306,
            username: 'root',
            password: 'develjsw1993!@',
            database: 'oop-slave',
            entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
            logging: ['error', 'warn', 'info', 'log'],
            synchronize: false
        }),
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
