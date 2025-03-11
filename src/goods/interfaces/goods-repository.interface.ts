import { GoodsEntity } from '../entities/goods.entity';
import { EntityManager } from 'typeorm';

export interface GoodsRepositoryInterface {
    createGoods(goods: Partial<GoodsEntity>, manager?: EntityManager): Promise<number>;
    findGoodsById(id: number): Promise<GoodsEntity | null>;
    findGoodsByIds(ids: number[]): Promise<GoodsEntity[] | []>;
}
