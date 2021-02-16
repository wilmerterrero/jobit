import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, BeforeInsert, BeforeRemove, BeforeUpdate, JoinColumn } from 'typeorm';
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

    @Column({type: 'text', nullable: true})
    description: string;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
    
    @ManyToOne(() => UsersModel, user => user.id)
    @JoinColumn()
    createdBy: UsersModel;

    /*
    TO-DO: validate if the user is an admin or moderator
    */
    @BeforeInsert()
    @BeforeRemove()
    @BeforeUpdate()
    public async VerifyRole(){
        //this only assigns a value to the created job, needs to be fixed
        try {
            const FindUserRole = await UsersModel.findOneOrFail({role: "admin" || "moderator"});
            if(!FindUserRole){
                console.log("Not an admin or moderator");
            }  
            else{
                this.createdBy = FindUserRole;
            }
        } catch (error) {
            console.log(error);
        }
    }
}