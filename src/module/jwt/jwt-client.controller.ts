import { Controller, Post, Headers, Body, ValidationPipe, Get, Query } from '@nestjs/common';
import { JwtClientService } from './service/jwt-client.service';
import { CreateJwtDto } from './dto/create-jwt.dto';
import { VerifyJwtDto } from './dto/verify-jwt.dto';

@Controller('jwts')
export class JwtClientController {
    constructor(private readonly jwtClientService: JwtClientService) {}

    @Post()
    async createJsonWebToken(@Body(new ValidationPipe({ transform: true })) dto: CreateJwtDto) {
        const { memberId } = dto;

        const accessTokenPayload = {
            memberId,
            tokenType: 'accessToken'
        };
        const refreshTokenPayload = {
            memberId,
            tokenType: 'refreshToken'
        };

        const accessToken = await this.jwtClientService.createJwt(accessTokenPayload, {
            expiresIn: 60 * 5
        });
        const refreshToken = await this.jwtClientService.createJwt(refreshTokenPayload, {
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

    // TODO : 작업중
    async refreshJwt() {}
}
