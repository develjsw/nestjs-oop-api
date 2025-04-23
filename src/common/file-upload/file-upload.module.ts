import { Module } from '@nestjs/common';
import { FILE_UPLOAD_SERVICE } from './constant/file-upload.constant';
import { FileUploadService } from './service/file-upload.service';

@Module({
    imports: [],
    providers: [{ provide: FILE_UPLOAD_SERVICE, useClass: FileUploadService }],
    exports: [FILE_UPLOAD_SERVICE]
})
export class FileUploadModule {}
