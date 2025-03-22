import { GoodsEntity } from '../entity/goods.entity';

export interface GoodsServiceInterface {
    findGoodsById(id: number): Promise<GoodsEntity | null>;
    createGoods(goods: Partial<GoodsEntity>): Promise<void>;
}
