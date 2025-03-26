import { CreateGoodsDto } from '../../dto/create-goods.dto';
import { GoodsDomain } from '../../domain/goods.domain';

// ORM 변경을 고려하여 DIP 적용
export abstract class GoodsRepositoryInterface {
    abstract createGoods(dto: CreateGoodsDto): Promise<void>;
    abstract findByGoodsId(id: number): Promise<GoodsDomain | null>;
}
