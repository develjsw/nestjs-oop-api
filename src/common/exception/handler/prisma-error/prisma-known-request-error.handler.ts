import { CustomExceptionHandler, ExceptionResponse } from '../../interface/custom-exception.handler';
import { PrismaClientKnownRequestError as MasterKnownRequestError } from 'prisma/generated/master-client/runtime/library';
import { PrismaClientKnownRequestError as SlaveKnownRequestError } from 'prisma/generated/slave-client/runtime/library';
import { HttpStatus } from '@nestjs/common';
import { PrismaErrorCodeMap } from '../../code/prisma-error.code';
import { formatMessage } from '../../util/error-message-formatter';

export class PrismaKnownRequestErrorHandler implements CustomExceptionHandler {
    canHandle(exception: any): boolean {
        return exception instanceof MasterKnownRequestError || exception instanceof SlaveKnownRequestError;
    }

    handle(exception: any): ExceptionResponse {
        const { code, meta, message } = exception;
        const errorInfo = PrismaErrorCodeMap[code];

        if (errorInfo) {
            const errorMessage: string = formatMessage(errorInfo.message, meta ?? {});
            return {
                message: errorMessage,
                error: `Prisma Error (${code})`,
                statusCode: errorInfo.status
            };
        }

        return {
            message: '정의되지 않은 Prisma 요청 오류입니다.',
            error: `Unhandled Prisma Error (${code})`,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR
        };
    }
}
