import { ExceptionHandlerInterface } from '../interface/exception-handler.interface';
import { ExceptionResponseType } from '../type/exception-response.type';
import { NotFoundException } from '@nestjs/common';

export class NotFoundErrorHandler implements ExceptionHandlerInterface<NotFoundException> {
    canHandle(exception: any): boolean {
        return exception instanceof NotFoundException;
    }

    handle(exception: NotFoundException, customMessage?: string): ExceptionResponseType {
        return {
            statusCode: 404,
            message: customMessage || exception.message || 'Not Found'
        };
    }
}
