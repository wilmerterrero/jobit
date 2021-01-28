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
        /*
        *TO-DO
        */
        const FindUser: UsersModel | undefined = await UsersModel.findOne({id: payload.id});
        if(FindUser?.role == "admin"){
            this.location = this.location;
            this.position = this.position;
            this.company = this.company;
            this.type = this.type;
        }
        else{
            return "User does not have admin role";
        }
    }
}