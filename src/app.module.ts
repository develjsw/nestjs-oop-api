import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as path from 'path';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from './common/cache/cache.module';
import { LifecycleModule } from './core/lifecycle/lifecycle.module';
import { TestModule } from './module/test/test.module';
import { AuthModule } from './module/auth/auth.module';
import { JwtClientModule } from './module/jwt/jwt-client.module';

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
        CacheModule,
        LifecycleModule,
        TestModule,
        AuthModule,
        JwtClientModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
