import { HttpMethodType } from '../type/http-method.type';
import { HttpHeaderType } from '../type/http-header.type';
import { HttpResponseType } from '../type/http-response.type';

export interface HttpClientInterface {
    setUrl(baseUrl: string, path?: string, pathParams?: Record<string, any>): this;
    setMethod(method: HttpMethodType): this;
    setHeader(header: HttpHeaderType): this;
    setData(data: any): this;
    setResponseType(responseType: HttpResponseType): this;
    setTimeOut(milliSecond: number): this;

    execute(): any;
    executeWithRetry(executeCount: number): void;
}
