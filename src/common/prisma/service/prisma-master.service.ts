import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient as PrismaMasterClient } from '@prisma-master-client';

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

    async runInTransaction<T>(callback: (tx: Prisma.TransactionClient) => Promise<T>): Promise<T> {
        return this.$transaction((tx: Prisma.TransactionClient) => callback(tx));
    }
}
