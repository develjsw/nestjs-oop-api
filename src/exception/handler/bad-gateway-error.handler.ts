import { BadGatewayException } from '@nestjs/common';
import { ExceptionHandlerInterface } from '../interface/exception-handler.interface';
import { ExceptionResponseType } from '../type/exception-response.type';

export class BadGatewayErrorHandler implements ExceptionHandlerInterface<BadGatewayException> {
    canHandle(exception: any): boolean {
        return exception instanceof BadGatewayException;
    }

    handle(exception: BadGatewayException, customMessage?: string): ExceptionResponseType {
        return {
            statusCode: 502,
            message: customMessage || exception.message || 'Bad Gateway'
        };
    }
}
