import { CustomExceptionHandler, ExceptionResponse } from '../../interface/custom-exception.handler';
import { HttpStatus, InternalServerErrorException } from '@nestjs/common';

export class InternalServerErrorHandler implements CustomExceptionHandler {
    canHandle(exception: any): boolean {
        return exception instanceof InternalServerErrorException;
    }

    handle(exception: any): ExceptionResponse {
        const errorDetails = exception?.response?.message || '';

        return {
            message: errorDetails || '서버 내부 오류',
            error: 'Internal Server Error',
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR
        };
    }
}
