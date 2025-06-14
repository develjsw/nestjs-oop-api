import { Body, Controller, Get, Post, Query, Headers } from '@nestjs/common';
import { JwtClientService } from './service/jwt-client.service';
import { CreateJwtDto } from './dto/create-jwt.dto';
import { VerifyJwtDto } from './dto/verify-jwt.dto';

@Controller('jwts')
export class JwtClientController {
    constructor(private readonly jwtClientService: JwtClientService) {}

    @Post()
    async createJwt(@Body() dto: CreateJwtDto) {
        return await this.jwtClientService.createToken(dto.userId, dto.userRole);
    }

    @Get('verify')
    async verifyJwt(@Query() dto: VerifyJwtDto, @Headers('Authorization') authHeader: string) {
        return await this.jwtClientService.verifyToken(authHeader, dto.tokenType);
    }

    @Post('refresh')
    async refreshJwt(@Headers('Authorization') authHeader: string) {
        return await this.jwtClientService.refreshToken(authHeader);
    }
}
