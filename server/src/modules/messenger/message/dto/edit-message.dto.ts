import {IsNotEmpty} from "class-validator";

export class EditMessageDto{

    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    text: string;

    @IsNotEmpty()
    roomID: string;

    page: number;
}