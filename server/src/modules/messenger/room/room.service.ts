import {Injectable} from "@nestjs/common";
import {CreateRoomDto} from "./dto/create-room.dto";
import {IRoom, RoomType} from "./IRoom";
import {RoomRepository} from "./room.repository";
import {ApiError} from "../../../api-error/api-error";

@Injectable()
export class RoomService{

    constructor(
        private readonly roomRepository: RoomRepository,
    ) {}

    async create(data: CreateRoomDto, author: string): Promise<IRoom>{

        data.users.push({id: author})

        if(data.type === RoomType.DIALOG){
            if(data.users.length !== 2) throw ApiError.BadRequest('Ошибка при создании диалога')
            let dialog = await this.roomRepository.findDialog(data.users);

            if(!dialog) dialog = await this.roomRepository.create(data);

            return this.prepareDialog(dialog, author)
        }

        return await this.roomRepository.create(data);
    }

    async getOne(id: string){
        return await this.roomRepository.findById(id)
    }

    public prepareDialog(dialog: IRoom, currentUser: string){
         dialog.users.map(user => {
            if(user.id !== currentUser){
                dialog.name = user.firstName + ' ' + user.secondName;
                dialog.icon = user.avatarUrl;
            }
        })

        return dialog
    }

    public getLastMessage(room: IRoom){
        room.messages = [...[room.messages[0]]]
        return room;
    }
}