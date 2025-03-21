import { ExceptionHandlerInterface } from '../interface/exception-handler.interface';
import { InternalServerErrorException } from '@nestjs/common';
import { ExceptionResponseType } from '../type/exception-response.type';

export class InternalServerErrorHandler implements ExceptionHandlerInterface<InternalServerErrorException> {
    canHandle(exception: any): boolean {
        return exception instanceof InternalServerErrorException;
    }

    handle(exception: InternalServerErrorException, customMessage?: string): ExceptionResponseType {
        return {
            statusCode: 500,
            message: customMessage || exception.message || 'Internal Server Error'
        };
    }
}
