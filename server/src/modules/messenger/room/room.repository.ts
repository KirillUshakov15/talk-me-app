import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {RoomEntity} from "./room.entity";
import {In, Repository} from "typeorm";
import {CreateRoomDto} from "./dto/create-room.dto";
import {IRoom, RoomType} from "./IRoom";
import {QueryRoomDto} from "./dto/query-room.dto";

@Injectable()
export class RoomRepository{

    constructor(
        @InjectRepository(RoomEntity)
        private readonly roomEntity: Repository<RoomEntity>
    ) {}

    async create(data: CreateRoomDto): Promise<IRoom>{
        const room = await this.roomEntity.save(data)
        return await this.roomEntity.findOne({where: {id: room.id}, relations: {users: true}})
    }

    async findDialog(users: {id: string}[]): Promise<IRoom>{
       const dialogs = await this.roomEntity.find({relations: ['users'], where: {users, type: RoomType.DIALOG}})
       return dialogs.filter(dialog => { return dialog.users.length === 2 })[0]
    }

    async findById(id: string): Promise<IRoom>{
        return await this.roomEntity.findOne({
            where: {id},
            select: {messages: {id: true, text: true, timestamp: true, author: {id: true, avatarUrl: true}}},
            relations: {messages: {author: true}}});
    }

}