import { Body, Controller, Get, Post, Query, Headers, ValidationPipe } from '@nestjs/common';
import { JwtClientService } from './service/jwt-client.service';
import { CreateJwtDto } from './dto/create-jwt.dto';
import { VerifyJwtDto } from './dto/verify-jwt.dto';

@Controller('jwts')
export class JwtClientController {
    constructor(private readonly jwtClientService: JwtClientService) {}

    @Post()
    async createJwt(@Body(new ValidationPipe({ transform: true })) dto: CreateJwtDto) {
        return await this.jwtClientService.createToken(dto.memberId);
    }

    @Get('verify')
    async verifyJwt(@Query(new ValidationPipe()) dto: VerifyJwtDto, @Headers('Authorization') authHeader: string) {
        return await this.jwtClientService.verifyToken(authHeader, dto.tokenType);
    }

    @Post('refresh')
    async refreshJwt(@Headers('Authorization') authHeader: string) {
        return await this.jwtClientService.refreshToken(authHeader);
    }
}
