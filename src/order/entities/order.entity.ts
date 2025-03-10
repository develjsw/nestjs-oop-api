import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('order')
export class OrderEntity {
    @PrimaryGeneratedColumn('increment', {
        name: 'order_id'
    })
    orderId: number;

    @Column({
        name: 'user_id',
        type: 'int'
    })
    userId: number;

    @Column({
        name: 'total_price',
        type: 'int'
    })
    totalPrice: number;

    @Column({
        name: 'order_status',
        type: 'varchar'
    })
    orderStatus: string;

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
