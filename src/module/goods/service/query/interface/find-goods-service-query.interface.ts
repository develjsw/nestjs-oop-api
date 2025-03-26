import { GoodsDomain } from '../../../domain/goods.domain';

export interface FindGoodsServiceQueryInterface {
    execute(goodsId: number): Promise<GoodsDomain | null>;
}
