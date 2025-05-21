import { CustomExceptionHandler, ExceptionResponse } from '../../interface/custom-exception.handler';
import { PrismaClientInitializationError as MasterInitializationError } from 'prisma/generated/master-client/runtime/library';
import { PrismaClientInitializationError as SlaveInitializationError } from 'prisma/generated/slave-client/runtime/library';
import { HttpStatus } from '@nestjs/common';

export class PrismaInitializationErrorHandler implements CustomExceptionHandler {
    canHandle(exception: any): boolean {
        return exception instanceof MasterInitializationError || exception instanceof SlaveInitializationError;
    }

    handle(): ExceptionResponse {
        return {
            message: 'DB 초기화 에러',
            error: 'Prisma Initialization Error',
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR
        };
    }
}
