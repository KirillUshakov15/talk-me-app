import {IUser} from "../../user/IUser";
import {IRoom} from "../room/IRoom";

export class IMessage{
    id: string;
    text: string;
    author: IUser;
    room: IRoom;
    timestamp: string;
}