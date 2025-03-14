import { Module } from '@nestjs/common';
import { OrderDetailController } from './order-detail.controller';
import { OrderDetailService } from './services/order-detail.service';
import { OrderDetailCommandRepository } from './repositories/command/order-detail-command.repository';

@Module({
    imports: [],
    controllers: [OrderDetailController],
    providers: [OrderDetailService, OrderDetailCommandRepository],
    exports: [OrderDetailCommandRepository]
})
export class OrderDetailModule {}
