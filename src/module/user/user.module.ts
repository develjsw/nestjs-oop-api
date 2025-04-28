import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserService } from './service/create-user.service';
import { CreateUserCommand } from './repository/command/create-user.command';
import { PrismaModule } from '../../common/prisma/prisma.module';
import { S3FileUploadModule } from '../../common/file-upload/s3/s3-file-upload.module';

@Module({
    imports: [PrismaModule, S3FileUploadModule],
    controllers: [UserController],
    providers: [CreateUserService, CreateUserCommand],
    exports: []
})
export class UserModule {}
