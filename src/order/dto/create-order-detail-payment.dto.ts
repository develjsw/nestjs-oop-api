import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CreateOrderDto {
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    userId: number;
}

class CreateOrderDetailDto {
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    goodsId: number;
}

export class CreateOrderDetailPaymentDto {
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CreateOrderDto)
    order: CreateOrderDto;

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CreateOrderDetailDto)
    @IsArray()
    @ArrayNotEmpty()
    orderDetails: CreateOrderDetailDto[];
}
