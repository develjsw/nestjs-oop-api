import { CustomExceptionHandler, ExceptionResponse } from '../../interface/custom-exception.handler';
import { HttpStatus, UnauthorizedException } from '@nestjs/common';

export class UnauthorizedErrorHandler implements CustomExceptionHandler {
    canHandle(exception: any): boolean {
        return exception instanceof UnauthorizedException;
    }

    handle(exception: any): ExceptionResponse {
        const errorDetails = exception?.response?.message || '';

        return {
            message: errorDetails || '인증 실패',
            error: 'Unauthorized',
            statusCode: HttpStatus.UNAUTHORIZED
        };
    }
}
