import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { s3Config } from '../../../config/s3/s3.config';
import { S3FileUploadService } from './service/s3-file-upload.service';
import { S3_FILE_UPLOAD_SERVICE } from './constant/s3-file-upload.constant';

@Module({
    imports: [ConfigModule.forFeature(s3Config)],
    providers: [{ provide: S3_FILE_UPLOAD_SERVICE, useClass: S3FileUploadService }],
    exports: [S3_FILE_UPLOAD_SERVICE]
})
export class S3FileUploadModule {}
