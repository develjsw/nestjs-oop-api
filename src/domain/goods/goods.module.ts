import { Module } from '@nestjs/common';
import { GoodsController } from './goods.controller';
import { GoodsService } from './service/goods.service';
import { GoodsCommandRepository } from './repository/command/goods-command.repository';
import { GoodsQueryRepository } from './repository/query/goods-query.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsEntity } from './entity/goods.entity';
import { CacheModule } from '../../infra/cache/cache.module';

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
