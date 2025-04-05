import { Module } from '@nestjs/common';
import { JwtClientService } from './service/jwt-client.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtClientController } from './jwt-client.controller';
import { CacheModule } from '../../common/cache/cache.module';

@Module({
    imports: [JwtModule, CacheModule],
    controllers: [JwtClientController],
    providers: [JwtClientService],
    exports: []
})
export class JwtClientModule {}
