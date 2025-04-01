import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './auth.controller';

@Module({
    imports: [],
    controllers: [AuthController],
    providers: [AuthService],
    exports: []
})
export class AuthModule {}
