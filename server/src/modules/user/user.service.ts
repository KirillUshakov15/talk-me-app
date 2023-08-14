import {Injectable} from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";
import {UserRepository} from "./user.repository";
import {EditUserDto} from "./dto/edit-user.dto";
import {EditPasswordDto} from "./dto/edit-password.dto";
import * as bcrypt from "bcryptjs"
import {ApiError} from "../../api-error/api-error";
import {RoomType} from "../messenger/room/IRoom";
import {RoomService} from "../messenger/room/room.service";

@Injectable()
export class UserService{

    constructor(
        private readonly userRepository: UserRepository,
        private readonly roomService: RoomService
    ) {}

    public async create(dto: CreateUserDto){
        return await this.userRepository.create(dto)
    }

    public async getOne(id: string){
        return await this.userRepository.getOne(id);
    }

    public async getRooms(currentUserID: string){
        const rooms = await this.userRepository.getUserRooms(currentUserID);

        return rooms.map(room => {
            if(room.type === RoomType.DIALOG) this.roomService.prepareDialog(room, currentUserID)
            this.roomService.getLastMessage(room)
            return room;
        }).sort((x, y) => {
            return x.messages[0].timestamp < y.messages[0].timestamp ? 1 : -1
        })
    }

    public async findByEmail(email: string){
        return await this.userRepository.findByEmail(email)
    }

    async editPassword(email: string, passwords: EditPasswordDto){
        const {password, confirmPassword, newPassword} = passwords;

        const user = await this.findByEmail(email);

        if(!await bcrypt.compare(password, user.password)) throw ApiError.BadRequest('Старый пароль указан неверно')
        if(newPassword !== confirmPassword) throw ApiError.BadRequest('Введенные пароли не совпадают')

        await this.userRepository.editPassword(user.id, await bcrypt.hash(newPassword, 5))
    }

    public async edit(id: string, editData: EditUserDto){
        return await this.userRepository.edit(id, {...editData});
    }
}