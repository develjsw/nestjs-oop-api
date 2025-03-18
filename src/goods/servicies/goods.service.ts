import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CacheServiceInterface } from '../../cache/interfaces/cache-service.interface';
import { GoodsEntity } from '../entities/goods.entity';
import { GoodsQueryRepository } from '../repositories/query/goods-query.repository';
import { GoodsServiceInterface } from '../interfaces/goods-service.interface';

@Injectable()
export class GoodsService implements GoodsServiceInterface {
    constructor(
        // Interface 설정 값(ICacheService)과 실제 값(CacheServiceInterface)을 구분 하기위해 다르게 설정
        @Inject('ICacheService')
        private readonly cacheService: CacheServiceInterface,

        private readonly goodsQueryRepository: GoodsQueryRepository
    ) {}

    // 변경이 적고, 자주 조회되는 상품 조회 기능에 Cache Aside Pattern 적용
    async findGoodsById(goodsId: number): Promise<GoodsEntity | null> {
        const cacheKey = `goods:${goodsId}`;

        const cachedData = await this.cacheService.get<GoodsEntity>(cacheKey);
        if (cachedData) {
            return cachedData;
        }

        const goods: GoodsEntity = await this.goodsQueryRepository.findGoodsById(goodsId);
        if (!goods) {
            throw new NotFoundException('상품 정보를 찾을 수 없습니다.');
        }

        await this.cacheService.set(cacheKey, goods, 60 * 15);

        return goods;
    }
}
