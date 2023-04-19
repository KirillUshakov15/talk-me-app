import {Injectable} from "@nestjs/common";
import {CreateMessageDto} from "./dto/create-message.dto";
import {DeleteMessageDto} from "./dto/delete-message.dto";
import {ApiError} from "../../../api-error/api-error";
import {MessageRepository} from "./message.repository";
import * as moment from 'moment'

@Injectable()
export class MessageService{

    constructor(private readonly messageRepository: MessageRepository) {}

    async create(createDto: CreateMessageDto){
        createDto.timestamp = moment().format("DD.MM.YYYY HH:mm")
        return await this.messageRepository.create(createDto)
    }

    async delete(deleteDto: DeleteMessageDto, userID: string){
        if(deleteDto.author !== userID) throw ApiError.Forbidden()

        await this.messageRepository.delete(deleteDto.id)
    }
}