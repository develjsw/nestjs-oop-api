import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateOrderDto {
    @IsOptional()
    @IsString()
    orderStatus: string;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    totalPrice: number;
}
