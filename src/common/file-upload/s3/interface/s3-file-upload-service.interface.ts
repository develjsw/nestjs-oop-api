import { S3FileUploadResultType } from '../type/s3-file-upload-result.type';

export interface S3FileUploadServiceInterface {
    uploadFile(file: Express.Multer.File, path: string): Promise<S3FileUploadResultType>;
}
