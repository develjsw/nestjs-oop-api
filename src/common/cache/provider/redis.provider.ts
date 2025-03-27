import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisProvider implements OnModuleInit, OnModuleDestroy {
    private readonly redis: RedisClientType;

    constructor(private readonly configService: ConfigService) {
        this.redis = createClient({
            url: `redis://${configService.get<string>('redis.host')}:${configService.get<number>('redis.port')}`
        });
    }

    async onModuleInit() {
        await this.redis.connect();
    }

    async onModuleDestroy() {
        await this.redis.quit();
    }

    getRedis(): RedisClientType {
        return this.redis;
    }
}
