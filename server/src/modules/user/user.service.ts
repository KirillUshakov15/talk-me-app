import {Injectable} from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";
import {UserRepository} from "./user.repository";
import {EditUserDto} from "./dto/edit-user.dto";
import {EditPasswordDto} from "./dto/edit-password.dto";
import * as bcrypt from "bcryptjs"
import * as fs from 'fs';
import {ApiError} from "../../api-error/api-error";
import {RoomType} from "../messenger/room/IRoom";
import {RoomService} from "../messenger/room/room.service";

@Injectable()
export class UserService{

    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    public async create(dto: CreateUserDto){
        return await this.userRepository.create(dto)
    }

    public async getOne(id: string){
        return await this.userRepository.getOne(id);
    }

    public async getFriends(id: string){
        return await this.userRepository.getFriends(id);
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

    public async edit(editData: EditUserDto){
        const {id, deletableAvatar, avatarUrl, secondName, firstName} = editData
        if(deletableAvatar) await this.deleteAvatar(id, deletableAvatar)
        return await this.userRepository.edit({id, avatarUrl, secondName, firstName});
    }

    public async deleteAvatar(userID: string, fileName: string){
        fs.unlinkSync(`./uploads/images/${fileName}`)
        return await this.userRepository.deleteAvatar(userID)
    }
}