import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './auth.controller';
import { JwtClientModule } from '../jwt/jwt-client.module';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Module({
    imports: [JwtClientModule],
    controllers: [AuthController],
    providers: [AuthService, JwtAuthGuard],
    exports: [AuthService]
})
export class AuthModule {}
