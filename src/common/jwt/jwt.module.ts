import { Module } from '@nestjs/common';
import { JwtService } from './service/jwt.service';
import { JWT_SERVICE } from './constant/jwt.constant';
import { ConfigModule } from '@nestjs/config';
import { jwtConfig } from '../../config/jwt/jwt.config';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';

@Module({
    imports: [ConfigModule.forFeature(jwtConfig), NestJwtModule],
    providers: [
        {
            provide: JWT_SERVICE,
            useClass: JwtService
        }
    ],
    exports: [JWT_SERVICE]
})
export class JwtModule {}
