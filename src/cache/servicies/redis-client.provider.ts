import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisClientProvider implements OnModuleInit, OnModuleDestroy {
    private readonly client: RedisClientType;

    constructor(private readonly configService: ConfigService) {
        this.client = createClient({
            url: `redis://${configService.get<string>('redis.host')}:${configService.get<number>('redis.port')}`
        });
    }

    async onModuleInit() {
        await this.client.connect();
    }

    async onModuleDestroy() {
        await this.client.quit();
    }

    getClient(): RedisClientType {
        return this.client;
    }
}
