import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, BeforeRemove } from 'typeorm';
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

    @BeforeInsert()
    @BeforeUpdate()
    @BeforeRemove()
    public async VerifyRole(payload: UsersModel){
        
    }
}