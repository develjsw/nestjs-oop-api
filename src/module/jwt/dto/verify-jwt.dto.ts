import { TokenTypeEnum } from '../enum/token-type.enum';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class VerifyJwtDto {
    @IsNotEmpty()
    @IsEnum(TokenTypeEnum)
    tokenType: TokenTypeEnum;
}
