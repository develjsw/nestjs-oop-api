import { HashCacheServiceInterface } from '../interface/hash-cache-service.interface';
import { Injectable } from '@nestjs/common';
import { RedisProvider } from '../provider/redis.provider';
import { RedisClientType } from 'redis';

@Injectable()
export class HashCacheService implements HashCacheServiceInterface {
    private readonly redis: RedisClientType;

    constructor(private readonly redisProvider: RedisProvider) {
        this.redis = this.redisProvider.getRedis();
    }

    async hSet(key: string, field: string, value: string): Promise<void> {
        await this.redis.hSet(key, field, value);
    }

    async hGet(key: string, field: string): Promise<string | null> {
        return await this.redis.hGet(key, field);
    }

    async hDel(key: string, field: string): Promise<void> {
        await this.redis.hDel(key, field);
    }

    async hGetAll(key: string): Promise<Record<string, string>> {
        return await this.redis.hGetAll(key);
    }
}
