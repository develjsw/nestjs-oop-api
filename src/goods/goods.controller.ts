import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { GoodsService } from './servicies/goods.service';
import { GoodsEntity } from './entities/goods.entity';

@Controller('goods')
export class GoodsController {
    constructor(private readonly goodsService: GoodsService) {}

    @Get(':goodsId')
    async findGoodsById(@Param('goodsId', ParseIntPipe) goodsId: number): Promise<GoodsEntity | null> {
        return await this.goodsService.findGoodsById(goodsId);
    }
}
