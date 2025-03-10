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
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderEntity } from './entities/order.entity';
import { UpdateOrderDto } from './dto/update-order.dto';
import { plainToInstance } from 'class-transformer';
import { CreateOrderPaymentDto } from './dto/create-order-payment.dto';
import { OrderTransactionService } from './services/order-transaction.service';
import { PaymentEntity } from '../payment/entities/payment.entity';

@Controller('orders')
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
        private readonly orderTransactionService: OrderTransactionService
    ) {}

    @Get(':orderId')
    async findOrderById(@Param('orderId', ParseIntPipe) orderId: number): Promise<OrderEntity> {
        return await this.orderService.findOrderById(orderId);
    }

    @Post()
    async createOrder(
        @Body(new ValidationPipe({ transform: true })) dto: CreateOrderDto
    ): Promise<{ orderId: number }> {
        const orderId: number = await this.orderService.createOrder(dto);

        return {
            orderId
        };
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

    @Post('with-payments')
    async createOrderAndPayment(
        @Body(new ValidationPipe({ transform: true })) dto: CreateOrderPaymentDto
    ): Promise<void> {
        const { order, payment } = dto;

        const orderInstance: OrderEntity = plainToInstance(OrderEntity, order);
        const paymentInstance: PaymentEntity = plainToInstance(PaymentEntity, payment);

        await this.orderTransactionService.createOrderAndPayment(orderInstance, paymentInstance);
    }
}
