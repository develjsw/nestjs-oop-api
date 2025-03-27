import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient as PrismaSlaveClient } from '../../../../prisma/generated/slave-client';

@Injectable()
export class PrismaSlaveService extends PrismaSlaveClient implements OnModuleInit {
    constructor() {
        super({
            datasources: {
                db: {
                    url: process.env.SLAVE_DATABASE_URL
                }
            },
            log: ['query', 'info', 'warn', 'error']
        });
    }

    async onModuleInit() {
        await this.$connect();
    }
}
