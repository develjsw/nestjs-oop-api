import { Module } from '@nestjs/common';
import { OrderDetailController } from './order-detail.controller';
import { OrderDetailService } from './service/order-detail.service';
import { OrderDetailCommandRepository } from './repository/command/order-detail-command.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetailEntity } from './entity/order-detail.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([OrderDetailEntity], 'master-db'),
        TypeOrmModule.forFeature([OrderDetailEntity], 'slave-db')
    ],
    controllers: [OrderDetailController],
    providers: [OrderDetailService, OrderDetailCommandRepository],
    exports: [OrderDetailCommandRepository]
})
export class OrderDetailModule {}
