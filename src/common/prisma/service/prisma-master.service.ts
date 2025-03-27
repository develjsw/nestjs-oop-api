import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient as PrismaMasterClient } from '../../../../prisma/generated/master-client';

@Injectable()
export class PrismaMasterService extends PrismaMasterClient implements OnModuleInit {
    constructor() {
        super({
            datasources: {
                db: {
                    url: process.env.MASTER_DATABASE_URL
                }
            },
            log: ['query', 'info', 'warn', 'error']
        });
    }

    async onModuleInit() {
        await this.$connect();
    }
}
