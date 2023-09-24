import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {RoomEntity} from "./room.entity";
import {Repository} from "typeorm";
import {CreateRoomDto} from "./dto/create-room.dto";
import {IRoom, RoomType} from "./IRoom";
import {UserEntity} from "../../user/user.entity";
import {EditRoomDto} from "./dto/edit-room.dto";

@Injectable()
export class RoomRepository{

    constructor(
        @InjectRepository(RoomEntity)
        private readonly roomEntity: Repository<RoomEntity>,

        @InjectRepository(UserEntity)
        private readonly userEntity: Repository<UserEntity>,
    ) {}

    async create(data: CreateRoomDto): Promise<IRoom>{
        const room = await this.roomEntity.save({...data, author: {id: data.author}})
        return await this.findById(room.id)
    }

    async findDialog(users: {id: string}[]): Promise<IRoom>{
       const dialogs = await this.roomEntity.find({where: {users, type: RoomType.DIALOG, }, relations: {users: true}})
       return dialogs.filter(dialog => { return dialog.users.length === 2 })[0]
    }

    async getAll(userID: string){
        const user = await this.userEntity.findOne({
            where: {id: userID},
            //select: { rooms: {messages: {id: true, text: true, timestamp: true, author: {id: true, avatarUrl: true}}}},
            order: {rooms: {messages: {timestamp: 'DESC'}}},
            relations: {rooms: {author: true, users: true, messages: {author: true}}}});

        return user.rooms
    }

    async edit(editRoomDto: EditRoomDto){
        return await this.roomEntity.update({id: editRoomDto.id}, {...editRoomDto})
        //return await this.roomEntity.findOne({where: {id: editRoomDto.id}})
    }

    async deleteIcon(id: string){
        await this.roomEntity.update({id}, {icon: null})
    }

    async findById(id: string): Promise<IRoom>{
        return await this.roomEntity.findOne({
            where: {id},
            select: { messages: {id: true, text: true, timestamp: true, author: {id: true, avatarUrl: true}}},
            relations: {users: true, author: true, messages: {author: true}}});
    }

}