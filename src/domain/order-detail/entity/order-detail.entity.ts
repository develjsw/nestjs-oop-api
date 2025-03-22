import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order_detail')
export class OrderDetailEntity {
    @PrimaryGeneratedColumn('increment', {
        name: 'order_detail_id'
    })
    orderDetailId: number;

    @Column({
        name: 'order_id',
        type: 'int'
    })
    orderId: number;

    @Column({
        name: 'goods_id',
        type: 'int'
    })
    goodsId: number;

    @Column({
        name: 'goods_price',
        type: 'int'
    })
    goodsPrice: number;

    @CreateDateColumn({
        name: 'create_at',
        type: 'datetime'
    })
    createAt: Date;
}
