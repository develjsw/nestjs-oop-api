import { CustomExceptionHandler, ExceptionResponse } from '../../interface/custom-exception.handler';
import { PrismaClientValidationError as MasterValidationError } from 'prisma/generated/master-client/runtime/library';
import { PrismaClientValidationError as SlaveValidationError } from 'prisma/generated/slave-client/runtime/library';
import { HttpStatus } from '@nestjs/common';

export class PrismaValidationErrorHandler implements CustomExceptionHandler {
    canHandle(exception: any): boolean {
        return exception instanceof MasterValidationError || exception instanceof SlaveValidationError;
    }

    handle(): ExceptionResponse {
        return {
            message: 'Prisma 유효성 검증 실패 에러',
            error: 'Prisma Validation Error',
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR
        };
    }
}
