import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import bcrypt from 'bcryptjs';

type Roles = "admin" | "client"

@Entity('users')
export class UsersModel extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar"})
    username: string;

    @Column({type: "varchar"})
    email: string;

    @Column({type: "varchar"})
    password: string;

    @Column({type: "timestamp", default: () =>"CURRENT_TIMESTAMP"})
    signedIn: Date

    @Column({type: "enum", enum: ["admin", "client"], default: "client"})
    role: Roles

    @BeforeInsert()
    public async HashPassword(){
        const Salt = await bcrypt.genSalt(10);
        const Hash = await bcrypt.hash(this.password, Salt);

        this.password = Hash;
    }
}
