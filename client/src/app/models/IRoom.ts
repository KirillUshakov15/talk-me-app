import {IUser, IUserData} from "@/models/IUserData";
import {IMessage} from "@/models/IMessage";

export enum RoomType {
    DIALOG = "DIALOG",
    CONVERSATION = "CONVERSATION"
}

export interface IRoom {
    id: string;
    name: string | null;
    type: RoomType
    icon: string;
    author?: IUser
    users?: IUser[]
    messages: IMessage[]
}

export interface IRoomPagination {
    count: number;
    rooms: IRoom[]
}