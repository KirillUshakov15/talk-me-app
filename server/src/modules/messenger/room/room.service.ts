import {Injectable} from "@nestjs/common";
import {CreateRoomDto} from "./dto/create-room.dto";
import {IRoom, RoomType} from "./IRoom";
import {RoomRepository} from "./room.repository";
import {ApiError} from "../../../api-error/api-error";
import {QueryRoomsDto} from "./dto/query-rooms.dto";

@Injectable()
export class RoomService{

    constructor(private readonly roomRepository: RoomRepository) {}

    async create(data: CreateRoomDto): Promise<IRoom>{

        if(data.type === RoomType.DIALOG){
            if(data.users.length !== 2) throw ApiError.BadRequest('Ошибка при создании диалога')

            const dialog = await this.roomRepository.findDialog(data.users);
            if(dialog) return dialog;
        }

        return await this.roomRepository.create(data);
    }

    async getAll(queryRoomsDto: QueryRoomsDto){
        return await this.roomRepository.findAll(queryRoomsDto)
    }

    async getOne(id: string){
        return await this.roomRepository.findById(id)
    }

}