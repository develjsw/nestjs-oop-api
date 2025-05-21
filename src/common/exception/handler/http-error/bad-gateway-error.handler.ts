import { CustomExceptionHandler, ExceptionResponse } from '../../interface/custom-exception.handler';
import { BadGatewayException, HttpStatus } from '@nestjs/common';

export class BadGatewayErrorHandler implements CustomExceptionHandler {
    canHandle(exception: any): boolean {
        return exception instanceof BadGatewayException;
    }

    handle(exception: any): ExceptionResponse {
        const errorDetails = exception?.response?.message || '';

        return {
            message: errorDetails || '게이트웨이 오류 발생',
            error: 'Bad Gateway',
            statusCode: HttpStatus.BAD_GATEWAY
        };
    }
}
