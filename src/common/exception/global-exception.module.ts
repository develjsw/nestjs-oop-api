import { Module } from '@nestjs/common';
import { ExceptionHandlerFactory } from './factory/exception-handler.factory';
import { GlobalExceptionFilter } from './filter/global-exception.filter';
import { BadGatewayErrorHandler } from './handler/http-error/bad-gateway-error.handler';
import { BadRequestErrorHandler } from './handler/http-error/bad-request-error.handler';
import { ForbiddenErrorHandler } from './handler/http-error/forbidden-error.handler';
import { InternalServerErrorHandler } from './handler/http-error/internal-server-error.handler';
import { NotFoundErrorHandler } from './handler/http-error/not-found-error.handler';
import { UnauthorizedErrorHandler } from './handler/http-error/unauthorized-error.handler';
import { ConflictErrorHandler } from './handler/http-error/conflict-error.handler';
import { PrismaKnownRequestErrorHandler } from './handler/prisma-error/prisma-known-request-error.handler';
import { PrismaUnknownRequestErrorHandler } from './handler/prisma-error/prisma-unknown-request-error.handler';
import { PrismaValidationErrorHandler } from './handler/prisma-error/prisma-validation-error-handler';
import { AxiosErrorHandler } from './handler/axios-error/axios-error.handler';

@Module({
    providers: [
        ExceptionHandlerFactory,
        GlobalExceptionFilter,
        BadGatewayErrorHandler,
        BadRequestErrorHandler,
        ForbiddenErrorHandler,
        InternalServerErrorHandler,
        NotFoundErrorHandler,
        UnauthorizedErrorHandler,
        ConflictErrorHandler,

        PrismaKnownRequestErrorHandler,
        PrismaUnknownRequestErrorHandler,
        PrismaValidationErrorHandler,

        AxiosErrorHandler
    ],
    exports: [GlobalExceptionFilter]
})
export class GlobalExceptionModule {}
