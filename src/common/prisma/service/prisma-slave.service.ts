import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient as PrismaSlaveClient } from '../../../../prisma/generated/slave-client';

@Injectable()
export class PrismaSlaveService extends PrismaSlaveClient implements OnModuleInit {
    constructor() {
        super({
            datasources: {
                db: {
                    // TODO : Config로 빼야 할지는 고민 필요
                    url: process.env.NET_SLAVE_DATABASE_URL
                }
            },
            log: ['query', 'info', 'warn', 'error']
        });
    }

    async onModuleInit() {
        await this.$connect();
    }
}
