import { IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateJwtDto {
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    memberId: number;
}
