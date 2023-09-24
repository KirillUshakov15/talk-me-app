import {IsNotEmpty} from "class-validator";
import {MessageType} from "../IMessage";

export class CreateMessageDto{
    @IsNotEmpty()
    text: string;

    @IsNotEmpty()
    roomID: string;

    type: MessageType

    author: string;
    timestamp?: string;
    page: number;
}