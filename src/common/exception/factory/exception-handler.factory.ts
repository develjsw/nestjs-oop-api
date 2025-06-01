import { Injectable, OnModuleInit } from '@nestjs/common';
import { CustomExceptionHandler } from '../interface/custom-exception.handler';
import { BadGatewayErrorHandler } from '../handler/http-error/bad-gateway-error.handler';
import { BadRequestErrorHandler } from '../handler/http-error/bad-request-error.handler';
import { ForbiddenErrorHandler } from '../handler/http-error/forbidden-error.handler';
import { InternalServerErrorHandler } from '../handler/http-error/internal-server-error.handler';
import { NotFoundErrorHandler } from '../handler/http-error/not-found-error.handler';
import { UnauthorizedErrorHandler } from '../handler/http-error/unauthorized-error.handler';
import { ConflictErrorHandler } from '../handler/http-error/conflict-error.handler';
import { PrismaKnownRequestErrorHandler } from '../handler/prisma-error/prisma-known-request-error.handler';
import { PrismaUnknownRequestErrorHandler } from '../handler/prisma-error/prisma-unknown-request-error.handler';
import { PrismaValidationErrorHandler } from '../handler/prisma-error/prisma-validation-error-handler';
import { AxiosErrorHandler } from '../handler/axios-error/axios-error.handler';

@Injectable()
export class ExceptionHandlerFactory implements OnModuleInit {
    private handlers: CustomExceptionHandler[] = [];

    constructor(
        private readonly badGatewayHandler: BadGatewayErrorHandler,
        private readonly badRequestHandler: BadRequestErrorHandler,
        private readonly forbiddenHandler: ForbiddenErrorHandler,
        private readonly internalServerHandler: InternalServerErrorHandler,
        private readonly notFoundHandler: NotFoundErrorHandler,
        private readonly unauthorizedHandler: UnauthorizedErrorHandler,
        private readonly conflictErrorHandler: ConflictErrorHandler,

        private readonly prismaKnownRequestHandler: PrismaKnownRequestErrorHandler,
        private readonly prismaUnknownRequestHandler: PrismaUnknownRequestErrorHandler,
        private readonly prismaValidationHandler: PrismaValidationErrorHandler,

        private readonly axiosHandler: AxiosErrorHandler
    ) {}

    onModuleInit(): void {
        this.handlers = [
            this.badGatewayHandler,
            this.badRequestHandler,
            this.forbiddenHandler,
            this.internalServerHandler,
            this.notFoundHandler,
            this.unauthorizedHandler,
            this.conflictErrorHandler,

            this.prismaKnownRequestHandler,
            this.prismaUnknownRequestHandler,
            this.prismaValidationHandler,

            this.axiosHandler
        ];
    }

    getHandler(exception: unknown): CustomExceptionHandler {
        return this.handlers.find((handler: CustomExceptionHandler) => handler.canHandle(exception));
    }
}
