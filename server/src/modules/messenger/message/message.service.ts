import {Injectable} from "@nestjs/common";
import {CreateMessageDto} from "./dto/create-message.dto";
import {DeleteMessageDto} from "./dto/delete-message.dto";
import {MessageRepository} from "./message.repository";
import * as moment from 'moment'
import {IMessagesPeriod} from "./IMessage";
import {QueryMessagesDto} from "./dto/query-messages.dto";
import {EditMessageDto} from "./dto/edit-message.dto";

@Injectable()
export class MessageService{

    constructor(private readonly messageRepository: MessageRepository) {}

    async create(createDto: CreateMessageDto){
        createDto.timestamp = moment().format("DD.MM.YYYY HH:mm:ss")
        return await this.messageRepository.create(createDto)
    }

    async edit(editDto: EditMessageDto){
        return await this.messageRepository.edit(editDto)
    }

    async delete(deleteDto: DeleteMessageDto){
        await this.messageRepository.delete(deleteDto)
    }

    async getAll(queryMessagesDto: QueryMessagesDto): Promise<[IMessagesPeriod[], number]>{
        const data = await this.messageRepository.getAll(queryMessagesDto);
        const messages = data[0];
        const periods = {} as IMessagesPeriod;

        for(const message of messages){
            const date = message.timestamp.split(' ')[0];
            (periods[date] = periods[date] || []).push(message)
        }

        const preparedPeriods = [] as IMessagesPeriod[]

        for(const period of Object.keys(periods)){
            preparedPeriods.push({date: period, messages: periods[period]})
        }

        return [preparedPeriods, data[1]]
    }
}