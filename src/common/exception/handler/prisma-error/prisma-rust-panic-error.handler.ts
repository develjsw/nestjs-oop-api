import { CustomExceptionHandler, ExceptionResponse } from '../../interface/custom-exception.handler';
import { PrismaClientRustPanicError as MasterRustPanicError } from 'prisma/generated/master-client/runtime/library';
import { PrismaClientRustPanicError as SlaveRustPanicError } from 'prisma/generated/slave-client/runtime/library';
import { HttpStatus } from '@nestjs/common';

export class PrismaRustPanicErrorHandler implements CustomExceptionHandler {
    canHandle(exception: any): boolean {
        return exception instanceof MasterRustPanicError || exception instanceof SlaveRustPanicError;
    }

    handle(): ExceptionResponse {
        return {
            message: 'Prisma 엔진 Panic 발생',
            error: 'Prisma Rust Panic Error',
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR
        };
    }
}
