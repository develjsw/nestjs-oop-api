import { Inject, Injectable } from '@nestjs/common';
import { CacheServiceInterface } from '../../cache/interfaces/cache-service.interface';

@Injectable()
export class GoodsService {
    constructor(
        // Interface 설정 값(ICacheService)과 실제 값(CacheServiceInterface)을 구분 하기위해 다르게 설정
        @Inject('ICacheService')
        private readonly cacheService: CacheServiceInterface
    ) {}
}
