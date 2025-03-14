import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, In, Repository } from 'typeorm';
import { GoodsEntity } from '../../entities/goods.entity';

@Injectable()
export class GoodsQueryRepository {
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
}
