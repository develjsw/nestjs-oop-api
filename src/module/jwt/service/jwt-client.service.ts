import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignOptions } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtClientService {
    private readonly secret: string;
    private defaultOptions: SignOptions;

    constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) {
        this.secret = this.loadSecretKey();
        this.initJwtConfig();
    }

    // [ onModuleInit 대신 loadSecretKey()를 사용하여 키 검증한 이유 ]
    // 디버깅(핫 리로드) 시 소스코드 변경마다 생성자가 다시 실행되므로 매번 키 유효성을 검증할 수 있어 더 안전함
    private loadSecretKey(): string {
        const secretKey = this.configService.get<string>('JWT_SECRET_KEY');
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

    /*onModuleInit() {
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
    }*/

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
