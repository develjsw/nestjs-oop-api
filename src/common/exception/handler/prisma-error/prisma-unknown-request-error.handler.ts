import { CustomExceptionHandler, ExceptionResponse } from '../../interface/custom-exception.handler';
import { PrismaClientUnknownRequestError as MasterUnknownRequestError } from 'prisma/generated/master-client/runtime/library';
import { PrismaClientUnknownRequestError as SlaveUnknownRequestError } from 'prisma/generated/slave-client/runtime/library';
import { HttpStatus } from '@nestjs/common';

export class PrismaUnknownRequestErrorHandler implements CustomExceptionHandler {
    canHandle(exception: any): boolean {
        return exception instanceof MasterUnknownRequestError || exception instanceof SlaveUnknownRequestError;
    }

    handle(): ExceptionResponse {
        return {
            message: '알 수 없는 Prisma 요청 에러',
            error: 'Prisma Unknown Request Error',
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR
        };
    }
}
