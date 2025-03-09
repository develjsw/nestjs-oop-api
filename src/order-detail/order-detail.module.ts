import { Module } from '@nestjs/common';
import { OrderDetailController } from './order-detail.controller';
import { OrderDetailService } from './services/order-detail.service';
import { OrderDetailRepository } from './repositories/order-detail.repository';

@Module({
    imports: [],
    controllers: [OrderDetailController],
    providers: [OrderDetailService, OrderDetailRepository],
    exports: []
})
export class OrderDetailModule {}
