import { Injectable } from '@nestjs/common';
import { GoodsCommandRepositoryInterface } from '../../interface/command/goods-command-repository.interface';
import { GoodsEntity } from '../../entity/goods.entity';
import { EntityManager, InsertResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GoodsCommandRepository implements GoodsCommandRepositoryInterface {
    constructor(
        @InjectRepository(GoodsEntity, 'master-db')
        private readonly goodsRepository: Repository<GoodsEntity>
    ) {}

    async createGoods(goods: Partial<Omit<GoodsEntity, 'goodsId'>>, manager?: EntityManager): Promise<number> {
        const currentRepository: Repository<GoodsEntity> = manager
            ? manager.getRepository(GoodsEntity)
            : this.goodsRepository;

        const insertResult: InsertResult = await currentRepository.insert(goods);

        return insertResult?.raw?.insertId || 0;
    }
}
