import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { UserRoleEnum } from '../../../common/auth/enum/user-role.enum';

export class CreateJwtDto {
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    userId: number;

    @IsNotEmpty()
    @IsEnum(UserRoleEnum)
    userRole: UserRoleEnum;
}
