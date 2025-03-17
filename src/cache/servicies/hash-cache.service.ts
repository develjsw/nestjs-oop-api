import { HashCacheServiceInterface } from '../interfaces/hash-cache-service.interface';
import { Injectable } from '@nestjs/common';
import { RedisClientProvider } from './redis-client.provider';

@Injectable()
export class HashCacheService implements HashCacheServiceInterface {
    private readonly client;

    constructor(private readonly redisClientProvider: RedisClientProvider) {
        this.client = this.redisClientProvider.getClient();
    }

    async hSet(key: string, field: string, value: string): Promise<void> {
        await this.client.hSet(key, field, value);
    }

    async hGet(key: string, field: string): Promise<string | null> {
        return await this.client.hGet(key, field);
    }

    async hDel(key: string, field: string): Promise<void> {
        await this.client.hDel(key, field);
    }

    async hGetAll(key: string): Promise<Record<string, string>> {
        return await this.client.hGetAll(key);
    }
}
