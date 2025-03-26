import { Module } from '@nestjs/common';
import { GoodsController } from './goods.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsEntity } from './entity/goods.entity';
import { GoodsRepository } from './repository/goods.repository';
import { CreateGoodsServiceCommand } from './service/command/create-goods-service.command';
import { FindGoodsServiceQuery } from './service/query/find-goods-service.query';

@Module({
    imports: [
        TypeOrmModule.forFeature([GoodsEntity], 'master-db'),
        TypeOrmModule.forFeature([GoodsEntity], 'slave-db')
    ],
    controllers: [GoodsController],
    providers: [
        {
            provide: 'GoodsRepositoryInterface',
            useClass: GoodsRepository
        },
        {
            provide: 'CreateGoodsServiceCommandInterface',
            useClass: CreateGoodsServiceCommand
        },
        {
            provide: 'FindGoodsServiceQueryInterface',
            useClass: FindGoodsServiceQuery
        }
    ],
    exports: []
})
export class GoodsModule {}
