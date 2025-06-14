import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SignOptions, JwtPayload } from 'jsonwebtoken';
import { JwtServiceInterface } from '../interface/jwt-service.interface';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { TokenTypeEnum } from '../enum/token-type.enum';

@Injectable()
export class JwtService implements JwtServiceInterface {
    private readonly secret: string;
    private defaultOptions: SignOptions;

    constructor(private readonly nestJwtService: NestJwtService, private readonly configService: ConfigService) {
        this.secret = this.loadSecretKey();
        this.initJwtConfig();
    }

    private loadSecretKey(): string {
        const secretKey: string = this.configService.get<string>('jwt.secretKey');
        if (!secretKey) {
            throw new Error('JWT_SECRET_KEY가 없습니다.');
        }

        return secretKey;
    }

    private initJwtConfig(): void {
        this.defaultOptions = {
            algorithm: 'HS256',
            header: {
                alg: 'HS256',
                typ: 'JWT'
            }
        };
    }

    async createJwt(payload: Record<string, any>, options?: SignOptions): Promise<string> {
        const option = { secret: this.secret, ...options };

        try {
            return await this.nestJwtService.signAsync(payload, option);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async verifyJwt(authHeader: string, tokenType: TokenTypeEnum): Promise<JwtPayload> {
        const [scheme, token] = authHeader.split(' ');

        if (scheme?.toLowerCase() !== 'bearer' || !token) {
            throw new BadRequestException('잘못된 토큰 정보입니다.');
        }

        const payload: JwtPayload = await this.nestJwtService
            .verifyAsync(token, { secret: this.secret })
            .then((response) => response)
            .catch((error) => {
                throw new UnauthorizedException(error.message);
            });

        if (payload?.type !== tokenType) {
            throw new UnauthorizedException('토큰 타입이 일치하지 않습니다.');
        }

        return payload;
    }
}
