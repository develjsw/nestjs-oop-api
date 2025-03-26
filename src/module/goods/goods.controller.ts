import { Controller, Get, Post, Param, Body, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { CreateGoodsServiceCommand } from './service/command/create-goods-service.command';
import { FindGoodsServiceQuery } from './service/query/find-goods-service.query';
import { CreateGoodsDto } from './dto/create-goods.dto';

@Controller('goods')
export class GoodsController {
    constructor(
        private readonly createGoodsServiceCommand: CreateGoodsServiceCommand,
        private readonly findGoodsServiceQuery: FindGoodsServiceQuery
    ) {}

    @Post()
    async create(@Body(new ValidationPipe({ transform: true })) dto: CreateGoodsDto) {
        return this.createGoodsServiceCommand.execute(dto);
    }

    @Get(':goodsId')
    async find(@Param('goodsId', ParseIntPipe) goodsId: number) {
        return this.findGoodsServiceQuery.execute(goodsId);
    }
}
