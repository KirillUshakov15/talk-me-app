import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Server, Socket} from 'socket.io'
import {RoomService} from "./room/room.service";
import {CreateMessageDto} from "./message/dto/create-message.dto";
import {MessageService} from "./message/message.service";
import {User} from "../../decorators/User";
import {IUserData} from "../user/IUser";
import {DeleteMessageDto} from "./message/dto/delete-message.dto";
import {UseGuards, UsePipes} from "@nestjs/common";
import {CheckAuthGuard} from "../../guards/check-auth.guard";
import {ValidationPipe} from "../../pipes/validation.pipe";
import {QueryMessagesDto} from "./message/dto/query-messages.dto";
import {EditMessageDto} from "./message/dto/edit-message.dto";

@WebSocketGateway({
    cors: true
})
export class MessengerGateway{

    constructor(
        private readonly roomService: RoomService,
        private readonly messageService: MessageService
    ) {}

    @WebSocketServer()
    server: Server

    @SubscribeMessage('messages:get')
    async getMessages(@MessageBody() queryMessagesDto: QueryMessagesDto){
        const {roomID} = queryMessagesDto;
        const messages = await this.messageService.getAll(queryMessagesDto)
        this.server.to(roomID).emit('room:get', messages)
    }

    @SubscribeMessage('room:join')
    async joinRoom(
        @ConnectedSocket() client: Socket,
        @MessageBody('roomID') roomID: string
    ){
        client.join(roomID);
        await this.getMessages({roomID, page: 1})
    }

    @SubscribeMessage('room:leave')
    async leaveRoom(
        @ConnectedSocket() client: Socket,
        @MessageBody('roomID') roomID: string
    ){
        client.leave(roomID)
    }

    @SubscribeMessage('message:send')
    @UsePipes(ValidationPipe)
    async sendMessage(@MessageBody() createDto: CreateMessageDto){
        const {roomID, page} = createDto;
        await this.messageService.create(createDto);
        await this.getMessages({roomID, page})
    }

    @SubscribeMessage('message:edit')
    @UsePipes(ValidationPipe)
    async editMessage(@MessageBody() editDto: EditMessageDto){
        const {roomID, page} = editDto;
        await this.messageService.edit(editDto)
        await this.getMessages({roomID, page})
    }

    @SubscribeMessage('message:delete')
    @UsePipes(ValidationPipe)
    async deleteMessage(@MessageBody() deleteDto: DeleteMessageDto){
        const {roomID, page} = deleteDto;
        await this.messageService.delete(deleteDto)
        await this.getMessages({roomID, page})
    }
}