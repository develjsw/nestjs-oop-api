import { Injectable } from '@nestjs/common';
import { CacheServiceInterface } from '../interfaces/cache-service.interface';
import { RedisClientProvider } from './redis-client.provider';

@Injectable()
export class CacheService implements CacheServiceInterface {
    private readonly client;

    constructor(private readonly redisClientProvider: RedisClientProvider) {
        this.client = this.redisClientProvider.getClient();
    }

    async get<T>(key: string): Promise<T | null> {
        const data = await this.client.get(key);
        return data ? JSON.parse(data) : null;
    }

    async set<T>(key: string, value: T, ttl?: number): Promise<void> {
        const expireTime = ttl ?? 60;
        await this.client.set(key, JSON.stringify(value), { EX: expireTime });
    }

    async del(key: string): Promise<void> {
        await this.client.del(key);
    }
}
