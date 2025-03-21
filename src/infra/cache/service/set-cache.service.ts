import { Injectable } from '@nestjs/common';
import { SetCacheServiceInterface } from '../interface/set-cache-service.interface';
import { RedisProvider } from '../provider/redis.provider';
import { RedisClientType } from 'redis';

@Injectable()
export class SetCacheService implements SetCacheServiceInterface {
    private readonly redis: RedisClientType;

    constructor(private readonly redisProvider: RedisProvider) {
        this.redis = this.redisProvider.getRedis();
    }

    async sAdd(key: string, value: string): Promise<void> {
        await this.redis.sAdd(key, value);
    }

    async sMembers(key: string): Promise<string[]> {
        return await this.redis.sMembers(key);
    }

    async sRem(key: string, value: string): Promise<void> {
        await this.redis.sRem(key, value);
    }

    async sCard(key: string): Promise<number> {
        return await this.redis.sCard(key);
    }
}
