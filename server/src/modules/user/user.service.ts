import {Injectable} from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";
import {UserRepository} from "./user.repository";

@Injectable()
export class UserService{

    constructor(private readonly userRepository: UserRepository) {}

    public async create(dto: CreateUserDto){
        return await this.userRepository.create(dto)
    }

    public findByEmail(email: string){
        return this.userRepository.findByEmail(email)
    }
}