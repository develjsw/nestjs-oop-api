import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payment')
export class PaymentEntity {
    @PrimaryGeneratedColumn('increment', {
        name: 'payment_id'
    })
    paymentId: number;

    @Column({
        name: 'order_id',
        type: 'int'
    })
    orderId: number;

    @Column({
        name: 'amount',
        type: 'int'
    })
    amount: number;

    @Column({
        name: 'payment_status',
        type: 'varchar'
    })
    paymentStatus: string;

    @CreateDateColumn({
        name: 'create_at',
        type: 'datetime'
    })
    createAt: Date;
}
