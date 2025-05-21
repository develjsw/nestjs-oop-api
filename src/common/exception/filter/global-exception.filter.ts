import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { CustomExceptionHandler } from '../interface/custom-exception.handler';
import { ExceptionHandlerFactory } from '../factory/exception-handler.factory';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    constructor(private readonly factory: ExceptionHandlerFactory) {}

    catch(exception: any, host: ArgumentsHost) {
        const ctx: HttpArgumentsHost = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const handler: CustomExceptionHandler = this.factory.getHandler(exception);

        const requestEndpoint: string = `${request.method}: ${request.originalUrl}` || '';
        const errorMessage = exception?.message || '';
        const errorStack = exception?.stack || '';

        console.error(exception);

        // TODO: requestEndpoint, errorMessage, errorStack 정보를 Hook Service로 전송하거나, NPM 로그 수집 도구를 통해 메트릭으로 기록

        if (handler) {
            const { message, error, statusCode } = handler.handle(exception);

            response.status(statusCode).json({
                message,
                error,
                statusCode
            });
        } else if (exception instanceof Error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: '에러 발생',
                error: 'Internal Server Error',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR
            });
        } else {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: '알 수 없는 오류 발생',
                error: 'Unhandled Exception',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR
            });
        }
    }
}
