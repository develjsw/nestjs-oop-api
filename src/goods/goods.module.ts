import { Module } from '@nestjs/common';
import { GoodsController } from './goods.controller';
import { GoodsService } from './servicies/goods.service';
import { GoodsCommandRepository } from './repositories/command/goods-command.repository';
import { GoodsQueryRepository } from './repositories/query/goods-query.repository';

@Module({
    imports: [],
    controllers: [GoodsController],
    providers: [GoodsService, GoodsCommandRepository, GoodsQueryRepository],
    exports: [GoodsCommandRepository, GoodsQueryRepository]
})
export class GoodsModule {}
