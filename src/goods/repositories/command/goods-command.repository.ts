import { Injectable } from '@nestjs/common';
import { GoodsCommandRepositoryInterface } from '../../interfaces/command/goods-command-repository.interface';
import { GoodsEntity } from '../../entities/goods.entity';
import { DataSource, EntityManager, InsertResult, Repository } from 'typeorm';

@Injectable()
export class GoodsCommandRepository implements GoodsCommandRepositoryInterface {
    private readonly goodsRepository: Repository<GoodsEntity>;

    constructor(private readonly dataSource: DataSource) {
        this.goodsRepository = this.dataSource.getRepository(GoodsEntity);
    }

    async createGoods(goods: Partial<Omit<GoodsEntity, 'goodsId'>>, manager?: EntityManager): Promise<number> {
        const currentRepository: Repository<GoodsEntity> = manager
            ? manager.getRepository(GoodsEntity)
            : this.goodsRepository;

        const insertResult: InsertResult = await currentRepository.insert(goods);

        return insertResult?.raw?.insertId || 0;
    }
}
