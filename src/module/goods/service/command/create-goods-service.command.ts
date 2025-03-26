import { Injectable } from '@nestjs/common';
import { CreateGoodsDto } from '../../dto/create-goods.dto';
import { GoodsRepositoryInterface } from '../../repository/interface/goods.repository.interface';
import { CreateGoodsServiceCommandInterface } from './interface/create-goods-service-command.interface';

@Injectable()
export class CreateGoodsServiceCommand implements CreateGoodsServiceCommandInterface {
    constructor(private readonly goodsRepositoryInterface: GoodsRepositoryInterface) {}

    async execute(dto: CreateGoodsDto): Promise<void> {
        await this.goodsRepositoryInterface.createGoods(dto);
    }
}
