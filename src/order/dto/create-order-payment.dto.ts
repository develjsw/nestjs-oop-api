import { IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CreateOrderDto {
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    userId: number;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    totalPrice: number;

    @IsNotEmpty()
    @IsString()
    @IsEnum(['PENDING', 'COMPLETE', 'CANCEL'])
    orderStatus: string;
}

class CreatePaymentDto {
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    amount: number;

    @IsNotEmpty()
    @IsString()
    @IsEnum(['PENDING', 'COMPLETE', 'CANCEL'])
    paymentStatus: string;
}

export class CreateOrderPaymentDto {
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CreateOrderDto)
    order: CreateOrderDto;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CreatePaymentDto)
    payment: CreatePaymentDto;
}
