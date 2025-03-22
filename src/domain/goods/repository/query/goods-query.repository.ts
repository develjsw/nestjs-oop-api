import { Injectable } from '@nestjs/common';
import { EntityManager, In, Repository } from 'typeorm';
import { GoodsEntity } from '../../entity/goods.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GoodsQueryRepository {
    constructor(
        /*
            - Default Connection : Slave-DB (CQRS Pattern 적용)
            - 아래 각각의 메소드에서 manager로 받고 있는 부분을 통해 Master-DB 등 Connection은 변경될 수 있도록 함
        */
        @InjectRepository(GoodsEntity, 'slave-db')
        private readonly goodsRepository: Repository<GoodsEntity>
    ) {}

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
