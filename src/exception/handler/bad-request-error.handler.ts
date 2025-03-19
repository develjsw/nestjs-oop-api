import { ExceptionHandlerInterface } from '../interface/exception-handler.interface';
import { BadRequestException } from '@nestjs/common';
import { ExceptionResponseType } from '../type/exception-response.type';

export class BadRequestErrorHandler implements ExceptionHandlerInterface<BadRequestException> {
    canHandle(exception: any): boolean {
        return exception instanceof BadRequestException;
    }

    handle(exception: BadRequestException, customMessage?: string): ExceptionResponseType {
        return {
            statusCode: 400,
            message: customMessage || exception.message || 'Bad Request'
        };
    }
}
