import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UsersModel } from '../models/users.model';

type Categories = "design" | "programming" | "cloud"

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

    @Column({type: 'text', nullable: true})
    description: string;

    @Column({type: 'enum', enum: ["design", "programming", "cloud"]})
    categories: Categories;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
    
    @ManyToOne(() => UsersModel, user => user.id)
    @JoinColumn()
    createdBy: UsersModel;
}