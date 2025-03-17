import { Injectable } from '@nestjs/common';
import { ListCacheServiceInterface } from '../interfaces/list-cache-service.interface';
import { RedisClientProvider } from './redis-client.provider';

@Injectable()
export class ListCacheService implements ListCacheServiceInterface {
    private readonly client;

    constructor(private readonly redisClientProvider: RedisClientProvider) {
        this.client = this.redisClientProvider.getClient();
    }

    async lPush(key: string, value: string): Promise<void> {
        await this.client.lPush(key, value);
    }

    async rPush(key: string, value: string): Promise<void> {
        await this.client.rPush(key, value);
    }

    async lRange(key: string, start: number, stop: number): Promise<string[]> {
        return await this.client.lRange(key, start, stop);
    }

    async lPop(key: string): Promise<string | null> {
        return await this.client.lPop(key);
    }

    async rPop(key: string): Promise<string | null> {
        return await this.client.rPop(key);
    }
}
