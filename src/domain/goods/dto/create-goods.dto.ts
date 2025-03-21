import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateGoodsDto {
    @IsString()
    @IsNotEmpty()
    goodsName: string;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    price: string;
}
