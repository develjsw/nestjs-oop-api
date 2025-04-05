import { Controller, Post, Headers, Body, ValidationPipe, Get, Query, Inject } from '@nestjs/common';
import { JwtClientService } from './service/jwt-client.service';
import { CreateJwtDto } from './dto/create-jwt.dto';
import { VerifyJwtDto } from './dto/verify-jwt.dto';
import { TokenTypeEnum } from './enum/token-type.enum';
import { CacheServiceInterface } from '../../common/cache/interface/cache-service.interface';
import { CACHE_SERVICE } from '../../common/cache/constant/cache.constant';

@Controller('jwts')
export class JwtClientController {
    constructor(
        private readonly jwtClientService: JwtClientService,

        @Inject(CACHE_SERVICE)
        private readonly cacheService: CacheServiceInterface
    ) {}

    @Post()
    async createJwt(@Body(new ValidationPipe({ transform: true })) dto: CreateJwtDto) {
        const { memberId } = dto;

        const accessTokenPayload = {
            memberId,
            tokenType: 'accessToken'
        };
        const refreshTokenPayload = {
            memberId,
            tokenType: 'refreshToken'
        };

        const accessToken: string = await this.jwtClientService.createJwt(accessTokenPayload, {
            expiresIn: 60 * 5
        });
        const refreshToken: string = await this.jwtClientService.createJwt(refreshTokenPayload, {
            expiresIn: 60 * 60 * 24 * 30
        });

        await this.cacheService.set(`refresh:${memberId}`, refreshToken, 60 * 60 * 24 * 30);

        return {
            accessToken,
            refreshToken
        };
    }

    @Get('verify')
    async verifyJwt(@Query(new ValidationPipe()) dto: VerifyJwtDto, @Headers('Authorization') authHeader: string) {
        const { tokenType } = dto;

        return await this.jwtClientService.verifyJwt(authHeader, tokenType);
    }

    @Post('refresh')
    async refreshJwt(@Headers('Authorization') authHeader: string) {
        const refreshTokenPayload = await this.jwtClientService.verifyJwt(authHeader, TokenTypeEnum.REFRESH_TOKEN);

        // TODO : 1. refresh token redis 조회
        // TODO : 1-1. 없는 경우 - UnauthorizedException
        // TODO : 1-2. 있는 경우 - accessToken + refreshToken 발급 - 아래 로직에 이미 구현됨

        const { memberId } = refreshTokenPayload;
        const newAccessToken: string = await this.jwtClientService.createJwt(
            { memberId, tokenType: TokenTypeEnum.ACCESS_TOKEN },
            { expiresIn: 60 * 5 }
        );
        const newRefreshToken: string = await this.jwtClientService.createJwt(
            { memberId, tokenType: TokenTypeEnum.REFRESH_TOKEN },
            { expiresIn: 60 * 60 * 24 * 30 }
        );

        // TODO : 2. 기존 refresh token 무효화 (= redis 삭제)
        // TODO : 3. 신규 refresh token 생성 (= redis 추가)

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        };
    }
}
