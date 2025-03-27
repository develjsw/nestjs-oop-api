import { Module } from '@nestjs/common';
import { PrismaMasterService } from './service/prisma-master.service';
import { PrismaSlaveService } from './service/prisma-slave.service';

@Module({
    providers: [PrismaMasterService, PrismaSlaveService],
    exports: [PrismaMasterService, PrismaSlaveService]
})
export class PrismaModule {}
