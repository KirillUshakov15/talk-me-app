import {Injectable} from "@nestjs/common";
import {CreateRoomDto} from "./dto/create-room.dto";
import {IRoom, RoomType} from "./IRoom";
import {RoomRepository} from "./room.repository";
import {ApiError} from "../../../api-error/api-error";
import {QueryRoomDto, QueryRoomsDto} from "./dto/query-room.dto";
import {UserService} from "../../user/user.service";
import {EditRoomDto} from "./dto/edit-room.dto";
import * as fs from 'fs';

@Injectable()
export class RoomService{

    constructor(
        private readonly userService: UserService,
        private readonly roomRepository: RoomRepository,
    ) {}

    async create(data: CreateRoomDto, author: string): Promise<IRoom>{

        data.users.push({id: author})

        if(data.type === RoomType.DIALOG){
            if(data.users.length !== 2) throw ApiError.BadRequest('Ошибка при создании диалога')
            let dialog = await this.roomRepository.findDialog(data.users);

            if(!dialog) dialog = await this.roomRepository.create({...data, author: null});

            return this.prepareDialog(dialog, author);
        }

        if(!data.name) throw ApiError.BadRequest('При создании беседы необходимо указать ее название')
        return await this.roomRepository.create({...data, author});
    }

    async edit(editRoomDto: EditRoomDto){
        const {id, icon, deletableIcon, name} = editRoomDto
        if(deletableIcon) await this.deleteIcon(id, deletableIcon)
        return await this.roomRepository.edit({id, icon, name})
    }

    async deleteIcon(roomID: string, roomIcon: string){
        fs.unlinkSync(`./uploads/images/${roomIcon}`)
        await this.roomRepository.deleteIcon(roomID)
    }

    async getOne(queryRoomDto: QueryRoomDto){
        const {roomID, userID} = queryRoomDto;
        let room = await this.roomRepository.findById(roomID)
        if(room.type === RoomType.DIALOG)
            room = this.prepareDialog(room, userID);
        else
            room.users = room.users.filter(user => user.id !== room.author.id)

        return room;
    }

    async getAll(queryRoomsDto: QueryRoomsDto){
        const {userID, queryText, page, limit} = queryRoomsDto;

        let rooms = await this.roomRepository.getAll(userID);

        rooms = rooms.filter(room => {
            return room.messages?.length > 0 || room.type === RoomType.CONVERSATION
        }).map(room => {
            this.getLastMessage(room)
            if(room.type === RoomType.DIALOG) this.prepareDialog(room, queryRoomsDto.userID)
            return room;
        }).sort((x, y) => {
            return x.messages[0]?.timestamp < y.messages[0]?.timestamp ? 1 : -1
        })

        const count = rooms.length;
        rooms = rooms.map(({author, users, ...rest}) => rest)

        if(queryText){
            rooms = rooms.filter(room => {
                return room.name.toLowerCase().includes(queryText.toLowerCase())
            })
        }

        //rooms = rooms.slice(0, (limit * page))

        return {count, rooms: rooms.slice(0, (limit * page))};
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