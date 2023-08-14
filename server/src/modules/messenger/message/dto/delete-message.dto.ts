import {IsNotEmpty} from "class-validator";

export class DeleteMessageDto{
    @IsNotEmpty()
    id: string;
    @IsNotEmpty()
    roomID: string;

    page: number;
}