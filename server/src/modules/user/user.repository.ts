import {Injectable} from "@nestjs/common";
import {getRepository, Not, Repository} from "typeorm";
import {UserEntity} from "./user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateUserDto} from "./dto/create-user.dto";
import {IUser} from "./IUser";
import {ApiError} from "../../api-error/api-error";
import {EditUserDto} from "./dto/edit-user.dto";
import {EditPasswordDto} from "./dto/edit-password.dto";
import {IMessage} from "../messenger/message/IMessage";

@Injectable()
export class UserRepository{

    constructor(
        @InjectRepository(UserEntity)
        private readonly userEntity: Repository<UserEntity>
    ) {}

    async create(createUserData: CreateUserDto): Promise<IUser>{
        return await this.userEntity.save(createUserData)
    }

    async findByEmail(email: string){
        return await this.userEntity.findOne({
            where: {email},
            select: ['id', "email", 'firstName','secondName', "password", "avatarUrl", "online"],
        })
    }

    public async getOne(id: string){
        const user = await this.userEntity.findOneBy({id});

        if(!user) throw ApiError.NotFound();

        return user;
    }

    public async getFriends(id: string): Promise<IUser[]>{
        return await this.userEntity.find({where: {id: Not(id)}});
    }

    public async edit(editData: EditUserDto){
        const {id} = editData
        return await this.userEntity.update({id}, {...editData})
    }

    public async editPassword(id: string, password: string){
        return await this.userEntity.update({id}, {password: password})
    }

    public async deleteAvatar(id: string){
        return await this.userEntity.update({id}, {avatarUrl: null})
    }

}