import { Inject, Injectable } from '@nestjs/common';
import { CacheServiceInterface } from '../../cache/interfaces/cache-service.interface';

@Injectable()
export class GoodsService {
    constructor(
        @Inject('ICacheService')
        private readonly cacheService: CacheServiceInterface
    ) {}
}
