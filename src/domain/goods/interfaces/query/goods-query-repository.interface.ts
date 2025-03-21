import { GoodsEntity } from '../../entities/goods.entity';

export interface GoodsQueryRepositoryInterface {
    findGoodsById(id: number): Promise<GoodsEntity | null>;
    findGoodsByIds(ids: number[]): Promise<GoodsEntity[] | []>;
}
