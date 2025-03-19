import { Body, Controller, Get, Param, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common';
import { GoodsService } from './servicies/goods.service';
import { GoodsEntity } from './entities/goods.entity';
import { CreateGoodsDto } from './dto/create-goods.dto';
import { plainToInstance } from 'class-transformer';

@Controller('goods')
export class GoodsController {
    constructor(private readonly goodsService: GoodsService) {}

    @Get(':goodsId')
    async findGoodsById(@Param('goodsId', ParseIntPipe) goodsId: number): Promise<GoodsEntity | null> {
        return await this.goodsService.findGoodsById(goodsId);
    }

    @Post()
    async createGoods(@Body(new ValidationPipe({ transform: true })) dto: CreateGoodsDto): Promise<void> {
        const goodsInstance: GoodsEntity = plainToInstance(GoodsEntity, dto);

        await this.goodsService.createGoods(goodsInstance);
    }
}
