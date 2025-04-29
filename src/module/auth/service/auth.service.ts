import { Injectable } from '@nestjs/common';
import { JwtClientService } from '../../jwt/service/jwt-client.service';
import { TokenTypeEnum } from '../../../common/jwt/enum/token-type.enum';

// TODO : Auth 모듈을 사용하지 않고 Jwt-Client (구현체) 모듈과 Jwt-Auth-Guard 만으로 핸들링 할것인지,
// TODO : Jwt 공통 모듈 (추상화 모듈) 을 제거하고 AS-IS로 진행할 것인지 고민 필요
@Injectable()
export class AuthService {
    constructor(private readonly jwtClientService: JwtClientService) {}

    async verifyToken(authHeader: string, tokenType: TokenTypeEnum) {
        return await this.jwtClientService.verifyToken(authHeader, tokenType);
    }
}
