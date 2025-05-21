import { CustomExceptionHandler, ExceptionResponse } from '../../interface/custom-exception.handler';
import { ConflictException, HttpStatus } from '@nestjs/common';

export class ConflictErrorHandler implements CustomExceptionHandler {
    canHandle(exception: any): boolean {
        return exception instanceof ConflictException;
    }

    handle(exception: any): ExceptionResponse {
        const errorDetails = exception?.response?.message || '';

        return {
            message: errorDetails || '이미 사용중인 데이터입니다',
            error: 'Conflict',
            statusCode: HttpStatus.CONFLICT
        };
    }
}
