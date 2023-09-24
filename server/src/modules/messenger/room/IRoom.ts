import {IUser} from "../../user/IUser";
import {IMessage} from "../message/IMessage";

export enum RoomType {
    DIALOG = "DIALOG",
    CONVERSATION = "CONVERSATION"
}

export interface IRoom {
    id: string;
    name?: string;
    icon: string;
    type: RoomType;
    author?: IUser;
    users?: IUser[]
    messages: IMessage[]
}

export interface IRoomPagination {
    count: number;
    rooms: IRoom[]
}