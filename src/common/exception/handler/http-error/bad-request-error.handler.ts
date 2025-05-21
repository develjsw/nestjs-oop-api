import { CustomExceptionHandler, ExceptionResponse } from '../../interface/custom-exception.handler';
import { BadRequestException, HttpStatus } from '@nestjs/common';

export class BadRequestErrorHandler implements CustomExceptionHandler {
    canHandle(exception: any): boolean {
        return exception instanceof BadRequestException;
    }

    handle(exception: any): ExceptionResponse {
        const errorDetails = exception?.response?.message || '';

        return {
            message: errorDetails || '잘못된 클라이언트 요청',
            error: 'Bad Request',
            statusCode: HttpStatus.BAD_REQUEST
        };
    }
}
