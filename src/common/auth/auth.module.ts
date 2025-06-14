import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtAccessStrategy } from './strategy/jwt-access-strategy';
import { JwtRefreshStrategy } from './strategy/jwt-refresh-strategy';
import { JwtAccessGuard } from './guard/jwt-access.guard';
import { JwtRefreshGuard } from './guard/jwt-refresh.guard';
import { RolesGuard } from './guard/roles.guard';

@Global()
@Module({
    imports: [PassportModule],
    providers: [JwtAccessStrategy, JwtRefreshStrategy, JwtAccessGuard, JwtRefreshGuard, RolesGuard],
    exports: [JwtAccessStrategy, JwtRefreshStrategy, JwtAccessGuard, JwtRefreshGuard, RolesGuard]
})
export class AuthModule {}
