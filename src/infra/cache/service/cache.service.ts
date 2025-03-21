import { Injectable } from '@nestjs/common';
import { CacheServiceInterface } from '../interface/cache-service.interface';
import { RedisProvider } from '../provider/redis.provider';
import { RedisClientType } from 'redis';

@Injectable()
export class CacheService implements CacheServiceInterface {
    private readonly redis: RedisClientType;

    constructor(private readonly redisProvider: RedisProvider) {
        this.redis = this.redisProvider.getRedis();
    }

    async get<T>(key: string): Promise<T | null> {
        const data = await this.redis.get(key);
        return data ? JSON.parse(data) : null;
    }

    async set<T>(key: string, value: T, ttl?: number): Promise<void> {
        const expireTime = ttl ?? 60;
        await this.redis.set(key, JSON.stringify(value), { EX: expireTime });
    }

    async del(key: string): Promise<void> {
        await this.redis.del(key);
    }
}
