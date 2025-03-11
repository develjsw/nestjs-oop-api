import { Injectable } from '@nestjs/common';
import { GoodsRepositoryInterface } from '../interfaces/goods-repository.interface';
import { GoodsEntity } from '../entities/goods.entity';
import { DataSource, EntityManager, In, InsertResult, Repository } from 'typeorm';

@Injectable()
export class GoodsRepository implements GoodsRepositoryInterface {
    private readonly goodsRepository: Repository<GoodsEntity>;

    constructor(private readonly dataSource: DataSource) {
        this.goodsRepository = this.dataSource.getRepository(GoodsEntity);
    }

    async findGoodsById(goodsId: number, manager?: EntityManager): Promise<GoodsEntity | null> {
        const currentRepository: Repository<GoodsEntity> = manager
            ? manager.getRepository(GoodsEntity)
            : this.goodsRepository;

        return await currentRepository.findOne({ where: { goodsId } });
    }

    async findGoodsByIds(goodsIds: number[], manager?: EntityManager): Promise<GoodsEntity[] | []> {
        const currentRepository: Repository<GoodsEntity> = manager
            ? manager.getRepository(GoodsEntity)
            : this.goodsRepository;

        return await currentRepository.find({ where: { goodsId: In(goodsIds) } });
    }

    async createGoods(goods: Partial<Omit<GoodsEntity, 'goodsId'>>, manager?: EntityManager): Promise<number> {
        const currentRepository: Repository<GoodsEntity> = manager
            ? manager.getRepository(GoodsEntity)
            : this.goodsRepository;

        const insertResult: InsertResult = await currentRepository.insert(goods);

        return insertResult?.raw?.insertId || 0;
    }
}
