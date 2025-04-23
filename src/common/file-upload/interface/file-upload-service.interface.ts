import { FilePathEnum } from '../enum/file-path.enum';

export interface FileUploadServiceInterface {
    uploadFile(file: Express.Multer.File, path: FilePathEnum): Promise<string>;
}
