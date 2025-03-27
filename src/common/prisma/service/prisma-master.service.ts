import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient as PrismaMasterClient } from '../../../../prisma/generated/master-client';

@Injectable()
export class PrismaMasterService extends PrismaMasterClient implements OnModuleInit {
    constructor() {
        super({
            datasources: {
                db: {
                    // TODO : Config로 빼야 할지는 고민 필요
                    url: process.env.NET_MASTER_DATABASE_URL
                }
            },
            log: ['query', 'info', 'warn', 'error']
        });
    }

    async onModuleInit() {
        await this.$connect();
    }
}
