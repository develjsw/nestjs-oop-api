import { Module } from '@nestjs/common';
import { JwtModule } from '../../common/jwt/jwt.module';
import { CacheModule } from '../../common/cache/cache.module';
import { JwtClientController } from './jwt-client.controller';
import { JwtClientService } from './service/jwt-client.service';

@Module({
    imports: [JwtModule, CacheModule],
    controllers: [JwtClientController],
    providers: [JwtClientService],
    exports: [JwtClientService]
})
export class JwtClientModule {}
