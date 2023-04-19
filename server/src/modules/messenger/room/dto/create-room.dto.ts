import {RoomType} from "../IRoom";
import {ArrayNotEmpty, IsNotEmpty} from "class-validator";

export class CreateRoomDto{
    @ArrayNotEmpty()
    users: {id: string}[];

    name?: string | null;

    @IsNotEmpty()
    type: RoomType;
}