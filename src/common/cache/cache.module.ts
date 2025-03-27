import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { redisConfig } from '../../config/redis.config';
import { RedisProvider } from './provider/redis.provider';
import { CacheService } from './service/cache.service';
import { HashCacheService } from './service/hash-cache.service';
import { ListCacheService } from './service/list-cache.service';
import { SetCacheService } from './service/set-cache.service';
import { CACHE_SERVICE, HASH_CACHE_SERVICE, LIST_CACHE_SERVICE, SET_CACHE_SERVICE } from './constant/cache.constant';

@Module({
    imports: [ConfigModule.forFeature(redisConfig)],
    providers: [
        RedisProvider,
        { provide: CACHE_SERVICE, useClass: CacheService },
        { provide: HASH_CACHE_SERVICE, useClass: HashCacheService },
        { provide: LIST_CACHE_SERVICE, useClass: ListCacheService },
        { provide: SET_CACHE_SERVICE, useClass: SetCacheService }
    ],
    exports: [CACHE_SERVICE, HASH_CACHE_SERVICE, LIST_CACHE_SERVICE, SET_CACHE_SERVICE]
})
export class CacheModule {}
