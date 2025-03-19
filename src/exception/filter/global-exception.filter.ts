import { ArgumentsHost, Catch, ExceptionFilter, Injectable } from '@nestjs/common';
import { ExceptionHandlerFactory } from '../factory/exception-handler.factory';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { ExceptionHandlerInterface } from '../interface/exception-handler.interface';

@Catch()
@Injectable()
export class GlobalExceptionFilter implements ExceptionFilter {
    constructor(private readonly factory: ExceptionHandlerFactory) {}

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx: HttpArgumentsHost = host.switchToHttp();
        const response = ctx.getResponse();

        const handler: ExceptionHandlerInterface<any> = this.factory.getHandler(exception);

        if (handler) {
            const { statusCode, message } = handler.handle(exception);
            response.status(statusCode).json({
                statusCode,
                message
            });
        } else {
            response.status(500).json({
                statusCode: 500,
                message: 'Unhandled Exception'
            });
        }
    }
}
