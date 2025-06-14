import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayloadInterface } from '../interface/jwt-payload.interface';
import { JwtTokenEnum } from '../enum/jwt-token.enum';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(private readonly configService: ConfigService) {
        const jwtSecret: string | undefined = configService.get<string>('JWT_SECRET_KEY');

        if (!jwtSecret) {
            throw new Error('JWT_SECRET_KEY 환경변수가 설정되지 않았습니다.');
        }

        super({
            // 토큰 검증 (BearerToken)
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // 시크릿 키 검증
            secretOrKey: jwtSecret
        });
    }

    validate(payload: JwtPayloadInterface): JwtPayloadInterface {
        if (payload.type !== JwtTokenEnum.REFRESH_TOKEN) {
            throw new UnauthorizedException('Refresh Token만 허용됩니다.');
        }

        return payload;
    }
}
