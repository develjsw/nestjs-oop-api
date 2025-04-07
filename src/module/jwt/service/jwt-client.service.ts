import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CacheServiceInterface } from '../../../common/cache/interface/cache-service.interface';
import { JwtServiceInterface } from '../../../common/jwt/interface/jwt-service.interface';
import { TokenTypeEnum } from '../../../common/jwt/enum/token-type.enum';
import { JwtPayload } from 'jsonwebtoken';
import { JWT_SERVICE } from '../../../common/jwt/constant/jwt.constant';
import { CACHE_SERVICE } from '../../../common/cache/constant/cache.constant';

@Injectable()
export class JwtClientService {
    constructor(
        @Inject(JWT_SERVICE)
        private readonly jwtService: JwtServiceInterface,

        @Inject(CACHE_SERVICE)
        private readonly cacheService: CacheServiceInterface
    ) {}

    async createToken(memberId: number): Promise<{ accessToken: string; refreshToken: string }> {
        const accessToken = await this.jwtService.createJwt(
            { memberId, tokenType: TokenTypeEnum.ACCESS_TOKEN },
            { expiresIn: 60 * 5 }
        );
        const refreshToken = await this.jwtService.createJwt(
            { memberId, tokenType: TokenTypeEnum.REFRESH_TOKEN },
            { expiresIn: 60 * 60 * 24 * 30 }
        );

        await this.cacheService.set(`refresh:${memberId}`, refreshToken, 60 * 60 * 24 * 30);

        return { accessToken, refreshToken };
    }

    async verifyToken(authHeader: string, tokenType: TokenTypeEnum): Promise<JwtPayload> {
        return await this.jwtService.verifyJwt(authHeader, tokenType);
    }

    async refreshToken(authHeader: string): Promise<{ accessToken: string; refreshToken: string }> {
        const payload = await this.jwtService.verifyJwt(authHeader, TokenTypeEnum.REFRESH_TOKEN);
        const [_, token] = authHeader.split(' ');
        const cacheToken = await this.cacheService.get(`refresh:${payload.memberId}`);

        if (cacheToken !== token) {
            throw new UnauthorizedException('유효하지 않은 refresh token 입니다.');
        }

        const newAccessToken = await this.jwtService.createJwt(
            { memberId: payload.memberId, tokenType: TokenTypeEnum.ACCESS_TOKEN },
            { expiresIn: 60 * 5 }
        );
        const newRefreshToken = await this.jwtService.createJwt(
            { memberId: payload.memberId, tokenType: TokenTypeEnum.REFRESH_TOKEN },
            { expiresIn: 60 * 60 * 24 * 30 }
        );

        await this.cacheService.set(`refresh:${payload.memberId}`, newRefreshToken, 60 * 60 * 24 * 30);

        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    }
}
