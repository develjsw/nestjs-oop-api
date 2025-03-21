import { ExceptionResponseType } from '../type/exception-response.type';

export interface ExceptionHandlerInterface<T> {
    canHandle(exception: T): boolean;
    handle(exception: T, customMessage?: string): ExceptionResponseType;
}
