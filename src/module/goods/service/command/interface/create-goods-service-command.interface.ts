import { CreateGoodsDto } from '../../../dto/create-goods.dto';

export interface CreateGoodsServiceCommandInterface {
    execute(dto: CreateGoodsDto): Promise<void>;
}
