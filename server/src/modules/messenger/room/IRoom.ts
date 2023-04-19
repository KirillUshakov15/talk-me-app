import {IUser} from "../../user/IUser";
import {IMessage} from "../message/IMessage";

export enum RoomType {
    DIALOG = "DIALOG",
    CONVERSATION = "CONVERSATION"
}

export interface IRoom {
    id: string;
    name?: string;
    users: IUser[]
    messages: IMessage[]
}