import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserService } from './service/create-user.service';
import { CreateUserCommand } from './repository/command/create-user.command';
import { PrismaModule } from '../../common/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [UserController],
    providers: [CreateUserService, CreateUserCommand],
    exports: []
})
export class UserModule {}
