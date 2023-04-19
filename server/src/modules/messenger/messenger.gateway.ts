import {MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Server} from 'socket.io'
import {RoomService} from "./room/room.service";
import {CreateMessageDto} from "./message/dto/create-message.dto";
import {MessageService} from "./message/message.service";
import {User} from "../../decorators/User";
import {IUserData} from "../user/IUser";
import {DeleteMessageDto} from "./message/dto/delete-message.dto";
import {UseGuards, UsePipes} from "@nestjs/common";
import {CheckAuthGuard} from "../../guards/check-auth.guard";
import {ValidationPipe} from "../../pipes/validation.pipe";

@WebSocketGateway()
export class MessengerGateway{

    constructor(
        private readonly roomService: RoomService,
        private readonly messageService: MessageService
    ) {}

    @WebSocketServer()
    server: Server

    @SubscribeMessage('get-messages')
    @UseGuards(CheckAuthGuard)
    async getMessages(@MessageBody('roomID') roomID: string){
        const room = await this.roomService.getOne(roomID);
        this.server.to(roomID).emit('get-messages', room)
    }

    @SubscribeMessage('send-message')
    @UseGuards(CheckAuthGuard)
    @UsePipes(ValidationPipe)
    async sendMessage(@MessageBody() createDto: CreateMessageDto, @User() user: IUserData){
        await this.messageService.create({...createDto, author: user.id});
        await this.getMessages(createDto.room)
    }

    @SubscribeMessage('delete-message')
    @UseGuards(CheckAuthGuard)
    @UsePipes(ValidationPipe)
    async deleteMessage(@MessageBody() deleteDto: DeleteMessageDto, @User() user: IUserData){
        await this.messageService.delete(deleteDto, user.id)
        await this.getMessages(deleteDto.room)
    }

}