import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as path from 'path';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from './common/cache/cache.module';
import { LifecycleModule } from './core/lifecycle/lifecycle.module';
import { TestModule } from './module/test/test.module';
import { AuthModule } from './module/auth/auth.module';
import { JwtModule } from './common/jwt/jwt.module';
import { JwtClientModule } from './module/jwt/jwt-client.module';
import { HttpClientModule } from './http-client/http-client.module';
import { BoardModule } from './module/board/board.module';
import { UserModule } from './module/user/user.module';
import { GlobalExceptionModule } from './common/exception/global-exception.module';
import { DiscoveryClientModule } from './common/discovery/discovery-client.module';

let envFile = 'env.local';
switch (process.env.NODE_ENV) {
    case 'production':
        envFile = 'env.production';
        break;
    case 'development':
        envFile = 'env.development';
        break;
}

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [path.resolve(__dirname, `../${envFile}`)],
            isGlobal: true,
            cache: true
        }),
        GlobalExceptionModule,
        CacheModule,
        LifecycleModule,
        TestModule,
        AuthModule,
        JwtModule,
        JwtClientModule,
        HttpClientModule,
        BoardModule,
        UserModule,
        DiscoveryClientModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
