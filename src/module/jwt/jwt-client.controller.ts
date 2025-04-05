import { Controller, Post, Headers, Body, ValidationPipe, Get, Query } from '@nestjs/common';
import { JwtClientService } from './service/jwt-client.service';
import { CreateJwtDto } from './dto/create-jwt.dto';
import { VerifyJwtDto } from './dto/verify-jwt.dto';
import { TokenTypeEnum } from './enum/token-type.enum';

@Controller('jwts')
export class JwtClientController {
    constructor(private readonly jwtClientService: JwtClientService) {}

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
        const newAccessToken: string = await this.jwtClientService.createJwt(
            { memberId, tokenType: TokenTypeEnum.ACCESS_TOKEN },
            { expiresIn: 60 * 5 }
        );
        const newRefreshToken: string = await this.jwtClientService.createJwt(
            { memberId, tokenType: TokenTypeEnum.REFRESH_TOKEN },
            { expiresIn: 60 * 60 * 24 * 30 }
        );

        // TODO : 기존 리프레시 토큰 무효화
        console.log(refreshTokenPayload);

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        };
    }
}
