import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {IUser} from "../user/IUser";
import {UserEntity} from "../user/user.entity";

@Entity('tokens')
export class TokenEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    refreshToken: string;

    @OneToOne(() => UserEntity)
    user: IUser;
}