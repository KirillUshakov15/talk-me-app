import {Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable} from "typeorm";
import {IRoom} from "../messenger/room/IRoom";
import {RoomEntity} from "../messenger/room/room.entity";

@Entity('users')
export class UserEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column({select: false})
    password: string;

    @Column()
    firstName: string;

    @Column()
    secondName: string;

    @Column({ nullable: true, default: null})
    avatarUrl: string;

    @Column({default: false})
    online: boolean;

    @ManyToMany(() => RoomEntity)
    @JoinTable({
        name: 'participants',
        joinColumn: {
            name: 'userId',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'roomId',
            referencedColumnName: 'id'
        }
    })
    rooms: IRoom[]
}