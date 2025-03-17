import { Injectable } from '@nestjs/common';
import { SetCacheServiceInterface } from '../interfaces/set-cache-service.interface';
import { RedisClientProvider } from './redis-client.provider';
import { RedisClientType } from 'redis';

@Injectable()
export class SetCacheService implements SetCacheServiceInterface {
    private readonly client: RedisClientType;

    constructor(private readonly redisClientProvider: RedisClientProvider) {
        this.client = this.redisClientProvider.getClient();
    }

    async sAdd(key: string, value: string): Promise<void> {
        await this.client.sAdd(key, value);
    }

    async sMembers(key: string): Promise<string[]> {
        return await this.client.sMembers(key);
    }

    async sRem(key: string, value: string): Promise<void> {
        await this.client.sRem(key, value);
    }

    async sCard(key: string): Promise<number> {
        return await this.client.sCard(key);
    }
}
