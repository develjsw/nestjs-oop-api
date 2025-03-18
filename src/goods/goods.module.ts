import { Module } from '@nestjs/common';
import { GoodsController } from './goods.controller';
import { GoodsService } from './servicies/goods.service';
import { GoodsCommandRepository } from './repositories/command/goods-command.repository';
import { GoodsQueryRepository } from './repositories/query/goods-query.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsEntity } from './entities/goods.entity';
import { CacheModule } from '../cache/cache.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([GoodsEntity], 'master-db'),
        TypeOrmModule.forFeature([GoodsEntity], 'slave-db'),
        CacheModule
    ],
    controllers: [GoodsController],
    providers: [GoodsService, GoodsCommandRepository, GoodsQueryRepository],
    exports: [GoodsCommandRepository, GoodsQueryRepository]
})
export class GoodsModule {}
