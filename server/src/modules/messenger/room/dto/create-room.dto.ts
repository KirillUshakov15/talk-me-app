import {RoomType} from "../IRoom";
import {ArrayNotEmpty, IsNotEmpty} from "class-validator";
import {Transform} from "class-transformer";

export class CreateRoomDto{
    @ArrayNotEmpty()
    ids: string[];

    @IsNotEmpty()
    type: RoomType;

    users: {id: string}[];

    name?: string | null;

    icon?: string | null;

    author?: string | null;
}