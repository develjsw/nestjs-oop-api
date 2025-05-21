import { CustomExceptionHandler, ExceptionResponse } from '../../interface/custom-exception.handler';
import { PrismaClientKnownRequestError as MasterKnownRequestError } from 'prisma/generated/master-client/runtime/library';
import { PrismaClientKnownRequestError as SlaveKnownRequestError } from 'prisma/generated/slave-client/runtime/library';
import { HttpStatus } from '@nestjs/common';

export class PrismaKnownRequestErrorHandler implements CustomExceptionHandler {
    canHandle(exception: any): boolean {
        return exception instanceof MasterKnownRequestError || exception instanceof SlaveKnownRequestError;
    }

    handle(): ExceptionResponse {
        return {
            message: 'DB 제약조건 위반 등 사전에 정의된 오류',
            error: 'Prisma Known Request Error',
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR
        };
    }
}
