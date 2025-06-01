export interface ExceptionResponse {
    message: string;
    error: string;
    statusCode: number;
}

export interface CustomExceptionHandler {
    canHandle(exception: any): boolean;
    handle(exception: any): ExceptionResponse;
}
