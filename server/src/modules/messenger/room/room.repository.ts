import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {RoomEntity} from "./room.entity";
import {In, Repository} from "typeorm";
import {CreateRoomDto} from "./dto/create-room.dto";
import {IRoom, RoomType} from "./IRoom";
import {QueryRoomsDto} from "./dto/query-rooms.dto";

@Injectable()
export class RoomRepository{

    constructor(
        @InjectRepository(RoomEntity)
        private readonly roomEntity: Repository<RoomEntity>
    ) {}

    async create(data: CreateRoomDto): Promise<IRoom>{
        return await this.roomEntity.save(data)
    }

    async findDialog(users: {id: string}[]){
       const dialogs = await this.roomEntity.find({relations: ['users'], where: {users, type: RoomType.DIALOG}})
       return dialogs.filter(dialog => { return dialog.users.length === 2 })[0]
    }

    async findAll(queryRoomsDto: QueryRoomsDto){
        const {userID} = queryRoomsDto;
        return await this.roomEntity.find({relations: ['users'], where: {users: {id: userID}}})
    }

    async findById(id: string): Promise<IRoom>{
        return await this.roomEntity.findOne({where: {id}, relations: ['messages']});
    }

}