import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                if ([undefined, null].includes(data)) {
                    return data;
                }

                return JSON.parse(
                    JSON.stringify(data, (key: string, value) => {
                        if (typeof value === 'bigint') {
                            return Number(value);
                        }

                        if (typeof value === 'string' && moment(value, moment.ISO_8601, true).isValid()) {
                            return moment(value).format('YYYY-MM-DD HH:mm:ss');
                        }

                        return value;
                    })
                );
            })
        );
    }
}