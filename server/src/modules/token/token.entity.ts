import {Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn, OneToMany} from "typeorm";
import {IUser} from "../user/IUser";
import {UserEntity} from "../user/user.entity";

@Entity('tokens')
export class TokenEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    refreshToken: string;

    @OneToOne(() => UserEntity)
    @JoinColumn()
    user: IUser;
}