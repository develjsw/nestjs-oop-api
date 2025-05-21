import { CustomExceptionHandler, ExceptionResponse } from '../../interface/custom-exception.handler';
import { HttpStatus } from '@nestjs/common';
import axios, { AxiosError } from 'axios';

export class AxiosErrorHandler implements CustomExceptionHandler {
    canHandle(exception: any): boolean {
        return axios.isAxiosError(exception);
    }

    handle(exception: AxiosError): ExceptionResponse {
        const statusCode: number =
            exception.response?.status ??
            (exception.code === 'ECONNABORTED' ? HttpStatus.GATEWAY_TIMEOUT : HttpStatus.BAD_GATEWAY);

        return {
            message: '외부 API 요청 실패',
            error: 'Axios Error',
            statusCode
        };
    }
}