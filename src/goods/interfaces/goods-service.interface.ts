import { GoodsEntity } from '../entities/goods.entity';

export interface GoodsServiceInterface {
    findGoodsById(id: number): Promise<GoodsEntity | null>;
}
