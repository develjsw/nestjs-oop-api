import { Injectable } from '@nestjs/common';
import { PrismaMasterService } from '../../../../common/prisma/service/prisma-master.service';
import { Prisma } from '../../../../../prisma/generated/master-client';

@Injectable()
export class CreateUserCommand {
    constructor(private readonly prismaMasterService: PrismaMasterService) {}

    async createUser(data: Prisma.userCreateInput): Promise<void> {
        await this.prismaMasterService.user.create({
            data
        });
    }
}
