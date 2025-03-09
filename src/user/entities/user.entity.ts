import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('increment', {
        name: 'user_id'
    })
    userId: number;

    @Column({
        name: 'user_name',
        type: 'varchar'
    })
    userName: string;

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
