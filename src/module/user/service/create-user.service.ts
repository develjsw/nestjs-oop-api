import { Inject, Injectable } from '@nestjs/common';
import { CreateUserCommand } from '../repository/command/create-user.command';
import { CreateUserDto } from '../dto/create-user.dto';
import { S3_FILE_UPLOAD_SERVICE } from '../../../common/file-upload/s3/constant/s3-file-upload.constant';
import { S3FileUploadServiceInterface } from '../../../common/file-upload/s3/interface/s3-file-upload-service.interface';
import { S3FileUploadResultType } from '../../../common/file-upload/s3/type/s3-file-upload-result.type';

@Injectable()
export class CreateUserService {
    constructor(
        private readonly createUserCommand: CreateUserCommand,

        @Inject(S3_FILE_UPLOAD_SERVICE)
        private readonly s3FileUploadService: S3FileUploadServiceInterface
    ) {}

    async createUser(dto: CreateUserDto, files: Express.Multer.File[]): Promise<void> {
        const { userId, userName } = dto;
        const filePath = `users/${userId}`;

        const fileUploadResults: S3FileUploadResultType[] = await Promise.all(
            files.map((file: Express.Multer.File) => this.s3FileUploadService.uploadFile(file, filePath))
        );

        await this.createUserCommand.createUser({
            user_name: userName,
            file: {
                createMany: {
                    data: fileUploadResults.map((fileUploadResult: S3FileUploadResultType) => {
                        return {
                            file_path: fileUploadResult.filePath,
                            file_name: fileUploadResult.originFileName,
                            file_hash_name: fileUploadResult.hashFileName
                        };
                    })
                }
            }
        });
    }
}
