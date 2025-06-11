import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient as PrismaSlaveClient } from '@prisma-slave-client';

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

    async runInTransaction<T>(callback: (tx: Prisma.TransactionClient) => Promise<T>): Promise<T> {
        return this.$transaction((tx: Prisma.TransactionClient) => callback(tx));
    }
}
