import { GoodsEntity } from '../../entities/goods.entity';
import { EntityManager } from 'typeorm';

export interface GoodsCommandRepositoryInterface {
    createGoods(goods: Partial<GoodsEntity>, manager?: EntityManager): Promise<number>;
}
