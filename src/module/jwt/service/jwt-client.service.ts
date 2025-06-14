import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CacheServiceInterface } from '../../../common/cache/interface/cache-service.interface';
import { JwtServiceInterface } from '../../../common/jwt/interface/jwt-service.interface';
import { TokenTypeEnum } from '../../../common/jwt/enum/token-type.enum';
import { JwtPayload } from 'jsonwebtoken';
import { JWT_SERVICE } from '../../../common/jwt/constant/jwt.constant';
import { CACHE_SERVICE } from '../../../common/cache/constant/cache.constant';
import { TokenType } from '../type/token.type';
import { UserRoleEnum } from '../../../common/auth/enum/user-role.enum';

@Injectable()
export class JwtClientService {
    private readonly accessTokenExpire = 60 * 5;
    private readonly refreshTokenExpire = 60 * 60 * 24 * 30;

    constructor(
        @Inject(JWT_SERVICE)
        private readonly jwtService: JwtServiceInterface,

        @Inject(CACHE_SERVICE)
        private readonly cacheService: CacheServiceInterface
    ) {}

    async createToken(userId: number, userRole: UserRoleEnum): Promise<TokenType> {
        const accessToken = await this.jwtService.createJwt(
            { sub: userId, role: userRole, type: TokenTypeEnum.ACCESS_TOKEN },
            { expiresIn: this.accessTokenExpire }
        );
        const refreshToken = await this.jwtService.createJwt(
            { sub: userId, role: userRole, type: TokenTypeEnum.REFRESH_TOKEN },
            { expiresIn: this.refreshTokenExpire }
        );

        await this.cacheService.set(`refresh:${userId}`, refreshToken, this.refreshTokenExpire);

        return { accessToken, refreshToken };
    }

    async verifyToken(authHeader: string, tokenType: TokenTypeEnum): Promise<JwtPayload> {
        return await this.jwtService.verifyJwt(authHeader, tokenType);
    }

    async refreshToken(authHeader: string): Promise<TokenType> {
        const payload = await this.jwtService.verifyJwt(authHeader, TokenTypeEnum.REFRESH_TOKEN);
        const [_, token] = authHeader.split(' ');
        const cacheToken = await this.cacheService.get(`refresh:${payload.sub}`);

        if (cacheToken !== token) {
            throw new UnauthorizedException('유효하지 않은 Refresh Token 입니다.');
        }

        const newAccessToken = await this.jwtService.createJwt(
            { sub: payload.sub, type: TokenTypeEnum.ACCESS_TOKEN },
            { expiresIn: this.accessTokenExpire }
        );
        const newRefreshToken = await this.jwtService.createJwt(
            { sub: payload.sub, type: TokenTypeEnum.REFRESH_TOKEN },
            { expiresIn: this.refreshTokenExpire }
        );

        await this.cacheService.set(`refresh:${payload.sub}`, newRefreshToken, this.refreshTokenExpire);

        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    }
}
