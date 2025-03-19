import { GoodsEntity } from '../entities/goods.entity';

export interface GoodsServiceInterface {
    findGoodsById(id: number): Promise<GoodsEntity | null>;
    createGoods(goods: Partial<GoodsEntity>): Promise<void>;
}
