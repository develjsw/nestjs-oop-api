import {
    Controller,
    Post,
    Headers,
    Body,
    ValidationPipe,
    Get,
    Query,
    Inject,
    UnauthorizedException
} from '@nestjs/common';
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

        const { memberId } = refreshTokenPayload;
        const [_, refreshToken] = authHeader.split(' ');

        const cacheRefreshToken: string = await this.cacheService.get(`refresh:${memberId}`);
        if (cacheRefreshToken !== refreshToken) {
            throw new UnauthorizedException('유효하지 않은 refresh token 입니다.');
        }

        const newAccessToken: string = await this.jwtClientService.createJwt(
            { memberId, tokenType: TokenTypeEnum.ACCESS_TOKEN },
            { expiresIn: 60 * 5 }
        );
        const newRefreshToken: string = await this.jwtClientService.createJwt(
            { memberId, tokenType: TokenTypeEnum.REFRESH_TOKEN },
            { expiresIn: 60 * 60 * 24 * 30 }
        );

        await this.cacheService.del(`refresh:${memberId}`); // 없어도 동일하게 동작하나 명시적으로 삭제처리
        await this.cacheService.set(`refresh:${memberId}`, newRefreshToken, 60 * 60 * 24 * 30);

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        };
    }
}
