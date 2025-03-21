import { Module } from '@nestjs/common';
import { GlobalExceptionFilter } from './filter/global-exception.filter';
import { ExceptionHandlerFactory } from './factory/exception-handler.factory';
import { InternalServerErrorHandler } from './handler/internal-server-error.handler';
import { NotFoundErrorHandler } from './handler/not-found-error.handler';
import { BadRequestErrorHandler } from './handler/bad-request-error.handler';
import { BadGatewayErrorHandler } from './handler/bad-gateway-error.handler';

@Module({
    imports: [],
    providers: [
        GlobalExceptionFilter,
        ExceptionHandlerFactory,
        InternalServerErrorHandler,
        NotFoundErrorHandler,
        BadRequestErrorHandler,
        BadGatewayErrorHandler
    ],
    exports: [GlobalExceptionFilter]
})
export class ExceptionModule {}
