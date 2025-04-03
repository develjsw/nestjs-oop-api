import { Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignOptions } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtClientService implements OnModuleInit {
    private secret: string;
    private defaultOptions: SignOptions;

    constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) {}

    onModuleInit() {
        this.secret = this.configService.getOrThrow<string>('JWT_SECRET_KEY'); // getOrThrow() → 키가 잘못됬거나 undefined인 경우에만 에러 발생시킴

        if (!this.secret?.trim()) {
            throw new Error('JWT_SECRET_KEY가 없거나 잘못되었습니다.');
        }

        this.defaultOptions = {
            algorithm: 'HS256',
            header: {
                alg: 'HS256',
                typ: 'JWT'
            }
        };
    }

    async createJwt(payload: object, options?: SignOptions): Promise<string | void> {
        const option = { secret: this.secret, ...options };

        return await this.jwtService
            .signAsync(payload, option)
            .then((response: string) => response)
            .catch((error) => {
                throw new InternalServerErrorException(error.message);
            });
    }
}
