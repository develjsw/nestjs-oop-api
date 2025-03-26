import { Injectable } from '@nestjs/common';
import { FindGoodsServiceQueryInterface } from './interface/find-goods-service-query.interface';
import { GoodsRepositoryInterface } from '../../repository/interface/goods.repository.interface';
import { GoodsDomain } from '../../domain/goods.domain';

@Injectable()
export class FindGoodsServiceQuery implements FindGoodsServiceQueryInterface {
    constructor(private readonly goodsRepositoryInterface: GoodsRepositoryInterface) {}

    async execute(goodsId: number): Promise<GoodsDomain | null> {
        return this.goodsRepositoryInterface.findByGoodsId(goodsId);
    }
}
