import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('goods')
export class GoodsEntity {
    @PrimaryGeneratedColumn('increment', {
        name: 'goods_id'
    })
    goodsId: number;

    @Column({
        name: 'goods_name',
        type: 'varchar'
    })
    name: string;

    @Column({
        name: 'price',
        type: 'int'
    })
    price: number;

    @CreateDateColumn({
        name: 'create_at',
        type: 'datetime'
    })
    createAt: Date;

    @UpdateDateColumn({
        name: 'update_at',
        type: 'datetime'
    })
    updateAt: Date;
}
