import { Injectable } from '@nestjs/common';
import { ListCacheServiceInterface } from '../interface/list-cache-service.interface';
import { RedisProvider } from '../provider/redis.provider';
import { RedisClientType } from 'redis';

@Injectable()
export class ListCacheService implements ListCacheServiceInterface {
    private readonly redis: RedisClientType;

    constructor(private readonly redisProvider: RedisProvider) {
        this.redis = this.redisProvider.getRedis();
    }

    async lPush(key: string, value: string): Promise<void> {
        await this.redis.lPush(key, value);
    }

    async rPush(key: string, value: string): Promise<void> {
        await this.redis.rPush(key, value);
    }

    async lRange(key: string, start: number, stop: number): Promise<string[]> {
        return await this.redis.lRange(key, start, stop);
    }

    async lPop(key: string): Promise<string | null> {
        return await this.redis.lPop(key);
    }

    async rPop(key: string): Promise<string | null> {
        return await this.redis.rPop(key);
    }
}
