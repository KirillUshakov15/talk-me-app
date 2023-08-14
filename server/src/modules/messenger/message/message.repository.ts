import {Injectable} from "@nestjs/common";
import {CreateMessageDto} from "./dto/create-message.dto";
import {Repository} from "typeorm";
import {MessageEntity} from "./message.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {DeleteMessageDto} from "./dto/delete-message.dto";
import {QueryMessagesDto} from "./dto/query-messages.dto";
import {IMessage} from "./IMessage";
import {EditMessageDto} from "./dto/edit-message.dto";

@Injectable()
export class MessageRepository{

    constructor(
        @InjectRepository(MessageEntity)
        private readonly messageEntity: Repository<MessageEntity>
    ) {}

    async create(data: CreateMessageDto){
        const message = this.messageEntity.create({...data, author: {id: data.author}, room: {id: data.roomID}})
        return await this.messageEntity.save(message)
    }

    async edit(data: EditMessageDto){
        const {id, text} = data
        return await this.messageEntity.update({id}, {text, isEdit: true})
    }

    async delete(deleteDto: DeleteMessageDto){
        const {id, roomID} = deleteDto;
        await this.messageEntity.delete({id, room: {id: roomID}})
    }

    async getAll(queryMessagesDto: QueryMessagesDto): Promise<[IMessage[], number]>{
        let {roomID, page} = queryMessagesDto;

        page = page || 1

        return await this.messageEntity.findAndCount({
            where: {room: {id: roomID}},
            order: {timestamp: "DESC"},
            relations: {author: true},
            //skip: (page - 1) * 10,
            take: page * 10
        })
    }
}