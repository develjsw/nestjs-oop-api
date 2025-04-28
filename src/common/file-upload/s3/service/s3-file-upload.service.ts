import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3FileUploadServiceInterface } from '../interface/s3-file-upload-service.interface';
import { extname } from 'path';
import { randomUUID } from 'crypto';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { S3FileUploadResultType } from '../type/s3-file-upload-result.type';

@Injectable()
export class S3FileUploadService implements S3FileUploadServiceInterface {
    private s3Client: S3Client;

    private bucketName: string;

    constructor(private readonly configService: ConfigService) {
        this.initS3Config();
    }

    private initS3Config(): void {
        const { region, bucketName, accessKeyId, secretAccessKey } = this.configService.get('s3');

        if (!region) {
            throw new Error('S3 AWS_REGION 값이 없습니다.');
        }

        if (!bucketName) {
            throw new Error('S3 AWS_BUCKET_NAME 값이 없습니다.');
        }

        if (!accessKeyId) {
            throw new Error('S3 AWS_ACCESS_KEY_ID 값이 없습니다.');
        }

        if (!secretAccessKey) {
            throw new Error('S3 AWS_SECRET_ACCESS_KEY 값이 없습니다.');
        }

        this.s3Client = new S3Client({
            region,
            credentials: {
                accessKeyId,
                secretAccessKey
            }
        });

        this.bucketName = bucketName;
    }

    async uploadFile(file: Express.Multer.File, filePath: string): Promise<S3FileUploadResultType> {
        const extension: string = extname(file.originalname);
        const originFileName: string = file.originalname;
        const hashFileName = `${randomUUID()}`;
        const key = `${filePath}/${hashFileName}${extension}`;

        const command: PutObjectCommand = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype
        });

        await this.s3Client.send(command);

        return {
            filePath,
            originFileName,
            hashFileName
        };
    }
}
