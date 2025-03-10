import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDto {
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
