import { Injectable } from '@nestjs/common';
import { BadGatewayErrorHandler } from '../handler/bad-gateway-error.handler';
import { BadRequestErrorHandler } from '../handler/bad-request-error.handler';
import { InternalServerErrorHandler } from '../handler/internal-server-error.handler';
import { NotFoundErrorHandler } from '../handler/not-found-error.handler';
import { ExceptionHandlerInterface } from '../interface/exception-handler.interface';

@Injectable()
export class ExceptionHandlerFactory {
    constructor(
        private readonly badGatewayErrorHandler: BadGatewayErrorHandler,
        private readonly badRequestErrorHandler: BadRequestErrorHandler,
        private readonly internalServerErrorHandler: InternalServerErrorHandler,
        private readonly notFoundErrorHandler: NotFoundErrorHandler
    ) {}

    private handlers: ExceptionHandlerInterface<any>[] = [];

    onModuleInit() {
        this.handlers = [
            this.badGatewayErrorHandler,
            this.badRequestErrorHandler,
            this.internalServerErrorHandler,
            this.notFoundErrorHandler
        ];
    }

    getHandler(exception: unknown): ExceptionHandlerInterface<any> {
        return this.handlers.find((handler: ExceptionHandlerInterface<any>) => handler.canHandle(exception));
    }
}
