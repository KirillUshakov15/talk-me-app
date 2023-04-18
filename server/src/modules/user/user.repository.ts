import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {UserEntity} from "./user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateUserDto} from "./dto/create-user.dto";

@Injectable()
export class UserRepository{

    constructor(
        @InjectRepository(UserEntity)
        private readonly userEntity: Repository<UserEntity>
    ) {}

    async create(createUserData: CreateUserDto){
        return await this.userEntity.save(createUserData)
    }

    async findByEmail(email: string){
        return this.userEntity.findOneBy({email})
    }

}