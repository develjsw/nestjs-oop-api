import { Module } from '@nestjs/common';
import { GoodsController } from './goods.controller';
import { GoodsService } from './servicies/goods.service';
import { GoodsRepository } from './repositories/goods.repository';

@Module({
    imports: [],
    controllers: [GoodsController],
    providers: [GoodsService, GoodsRepository],
    exports: [GoodsRepository]
})
export class GoodsModule {}
