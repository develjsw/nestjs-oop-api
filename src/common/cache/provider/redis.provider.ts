import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisProvider implements OnModuleInit, OnModuleDestroy {
    private readonly redis: RedisClientType;
    private readonly redisHost: string;
    private readonly redisPort: number;

    constructor(private readonly configService: ConfigService) {
        this.redisHost = this.loadRedisHost();
        this.redisPort = this.loadRedisPort();

        this.redis = createClient({
            url: `redis://${this.redisHost}:${this.redisPort}`
        });
    }

    private loadRedisHost(): string {
        const redisHost: string = this.configService.get<string>('redis.host');

        if (!redisHost) {
            throw new Error('RedisPost가 없습니다.');
        }

        return redisHost;
    }

    private loadRedisPort(): number {
        const redisPort: number = this.configService.get<number>('redis.port');

        if (!redisPort) {
            throw new Error('RedisPort가 없습니다.');
        }

        return redisPort;
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
