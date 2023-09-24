import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {IUser} from "../../user/IUser";
import {IRoom} from "../room/IRoom";
import {UserEntity} from "../../user/user.entity";
import {RoomEntity} from "../room/room.entity";
import {MessageType} from "./IMessage";

@Entity('messages')
export class MessageEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    text: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn()
    author: IUser;

    @ManyToOne(() => RoomEntity)
    @JoinColumn()
    room: IRoom;

    @Column({default: MessageType.DEFAULT})
    type: MessageType

    @Column()
    timestamp: string;

    @Column({default: false})
    isEdit: boolean
}