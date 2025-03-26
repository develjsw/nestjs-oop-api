import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoodsEntity } from '../entity/goods.entity';
import { CreateGoodsDto } from '../dto/create-goods.dto';
import { GoodsDomain } from '../domain/goods.domain';
import { GoodsRepositoryInterface } from './interface/goods.repository.interface';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class GoodsRepository implements GoodsRepositoryInterface {
    constructor(
        @InjectRepository(GoodsEntity, 'master-db')
        private readonly goodsRepository: Repository<GoodsEntity>
    ) {}

    async createGoods(dto: CreateGoodsDto): Promise<void> {
        await this.goodsRepository.insert(dto);
    }

    async findByGoodsId(goodsId: number): Promise<GoodsDomain | null> {
        const entity = await this.goodsRepository.findOneBy({ goodsId });

        return plainToInstance(GoodsDomain, entity);
    }
}
