import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    ValidationPipe
} from '@nestjs/common';
import { OrderService } from './services/order.service';
import { OrderEntity } from './entities/order.entity';
import { UpdateOrderDto } from './dto/update-order.dto';
import { plainToInstance } from 'class-transformer';
import { CreateOrderDetailPaymentDto } from './dto/create-order-detail-payment.dto';
import { OrderTransactionService } from './services/order-transaction.service';
import { OrderDetailEntity } from '../order-detail/entities/order-detail.entity';
import { CreateOrderDetailDto } from '../order-detail/dto/create-order-detail.dto';

@Controller('orders')
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
        private readonly orderTransactionService: OrderTransactionService
    ) {}

    @Post()
    async createFullOrder(
        @Body(new ValidationPipe({ transform: true })) dto: CreateOrderDetailPaymentDto
    ): Promise<void> {
        const { order, orderDetails } = dto;

        const orderInstance: OrderEntity = plainToInstance(OrderEntity, order);

        const orderDetailInstances: OrderDetailEntity[] = orderDetails.map((orderDetail: CreateOrderDetailDto) =>
            plainToInstance(OrderDetailEntity, orderDetail)
        );

        await this.orderTransactionService.createOrderWithDetailAndPayment(orderInstance, orderDetailInstances);
    }

    @Get(':orderId')
    async findOrderById(@Param('orderId', ParseIntPipe) orderId: number): Promise<OrderEntity> {
        return await this.orderService.findOrderById(orderId);
    }

    @Patch(':orderId')
    async updateOrderById(
        @Param('orderId', ParseIntPipe) orderId: number,
        @Body(new ValidationPipe({ transform: true })) dto: UpdateOrderDto
    ): Promise<void> {
        if (!Object.keys(dto).length) {
            throw new BadRequestException('수정할 주문 정보가 없습니다.');
        }

        const orderInstance: OrderEntity = plainToInstance(OrderEntity, dto);

        await this.orderService.updateOrderById(orderId, orderInstance);
    }
}
