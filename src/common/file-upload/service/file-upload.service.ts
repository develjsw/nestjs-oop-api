import { Injectable } from '@nestjs/common';
import { FilePathEnum } from '../enum/file-path.enum';
import { FileUploadServiceInterface } from '../interface/file-upload-service.interface';

@Injectable()
export class FileUploadService implements FileUploadServiceInterface {
    constructor() {}

    async uploadFile(file: Express.Multer.File, path: FilePathEnum): Promise<string> {
        return '';
    }
}
