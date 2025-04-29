import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenTypeEnum } from '../../../common/jwt/enum/token-type.enum';
import { AuthService } from '../service/auth.service';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly reflector: Reflector, private readonly authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest<Request>();
        const authHeader = request.headers['authorization'];

        if (!authHeader) {
            throw new UnauthorizedException('Authorization Header 가 없습니다');
        }

        const tokenType: TokenTypeEnum =
            this.reflector.get<TokenTypeEnum>('tokenType', context.getHandler()) || TokenTypeEnum.ACCESS_TOKEN;

        try {
            request['user'] = await this.authService.verifyToken(authHeader, tokenType);

            return true;
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }
    }
}
