import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { redisConfig } from '../config/redis.config';
import { RedisClientProvider } from './servicies/redis-client.provider';
import { CacheService } from './servicies/cache.service';
import { HashCacheService } from './servicies/hash-cache.service';
import { ListCacheService } from './servicies/list-cache.service';
import { SetCacheService } from './servicies/set-cache.service';

@Module({
    imports: [ConfigModule.forFeature(redisConfig)],
    providers: [RedisClientProvider, CacheService, HashCacheService, ListCacheService, SetCacheService],
    exports: [CacheService, HashCacheService, ListCacheService, SetCacheService]
})
export class CacheModule {}
