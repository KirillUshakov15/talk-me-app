import {IsNotEmpty} from "class-validator";

export class CreateMessageDto{
    @IsNotEmpty()
    text: string;

    @IsNotEmpty()
    roomID: string;

    author: string;
    timestamp?: string;
    page: number;
}