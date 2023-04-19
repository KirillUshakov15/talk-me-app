import {Injectable} from "@nestjs/common";
import {CreateMessageDto} from "./dto/create-message.dto";
import {Repository} from "typeorm";
import {MessageEntity} from "./message.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class MessageRepository{

    constructor(
        @InjectRepository(MessageEntity)
        private readonly messageEntity: Repository<MessageEntity>
    ) {}

    async create(data: CreateMessageDto){
        const message = this.messageEntity.create({...data, author: {id: data.author}, room: {id: data.room}})
        return await this.messageEntity.save(message)
    }

    async delete(id: string){
        await this.messageEntity.delete({id})
    }
}