import { CustomExceptionHandler, ExceptionResponse } from '../../interface/custom-exception.handler';
import { HttpStatus, NotFoundException } from '@nestjs/common';

export class NotFoundErrorHandler implements CustomExceptionHandler {
    canHandle(exception: any): boolean {
        return exception instanceof NotFoundException;
    }

    handle(exception: any): ExceptionResponse {
        const errorDetails = exception?.response?.message || '';

        return {
            message: errorDetails || '찾을 수 없음',
            error: 'Not Found',
            statusCode: HttpStatus.NOT_FOUND
        };
    }
}
