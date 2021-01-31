import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { UsersModel } from '../models/users.model';

@Entity('jobs')
export class JobsModel extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar"})
    location: string;

    @Column({type: "varchar"})
    position: string;

    @Column({type: "varchar"})
    company: string;

    @Column({type: "varchar"})
    type: string;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
    
    @OneToOne(() => UsersModel)
    @JoinColumn()
    createdBy: UsersModel;
}