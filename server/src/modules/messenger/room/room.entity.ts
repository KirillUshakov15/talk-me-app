import {Column, Entity, ManyToMany, JoinTable, PrimaryGeneratedColumn, OneToMany, JoinColumn} from "typeorm";
import {IUser} from "../../user/IUser";
import {UserEntity} from "../../user/user.entity";
import {RoomType} from "./IRoom";
import {IMessage} from "../message/IMessage";
import {MessageEntity} from "../message/message.entity";

@Entity('rooms')
export class RoomEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: true})
    name?: string;

    @Column()
    type: RoomType

    @ManyToMany(() => UserEntity)
    @JoinTable({
        name: 'participants',
        joinColumn: {
            name: 'roomId',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'userId',
            referencedColumnName: 'id'
        }
    })
    users: IUser[]

    @OneToMany(() => MessageEntity, message => message.room)
    @JoinColumn()
    messages: IMessage[]

}