import { CustomExceptionHandler, ExceptionResponse } from '../../interface/custom-exception.handler';
import { ForbiddenException, HttpStatus } from '@nestjs/common';

export class ForbiddenErrorHandler implements CustomExceptionHandler {
    canHandle(exception: any): boolean {
        return exception instanceof ForbiddenException;
    }

    handle(exception: any): ExceptionResponse {
        const errorDetails = exception?.response?.message || '';

        return {
            message: errorDetails || '인가 실패',
            error: 'Forbidden',
            statusCode: HttpStatus.FORBIDDEN
        };
    }
}
