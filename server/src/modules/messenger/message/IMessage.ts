import {IUser} from "../../user/IUser";
import {IRoom} from "../room/IRoom";

export enum MessageType {
    DEFAULT = "DEFAULT",
    SYSTEM = "SYSTEM"
}

export interface IMessage{
    id: string;
    text: string;
    author: IUser;
    type: MessageType
    //room: IRoom;
    timestamp: string;
    isEdit: boolean;
}

export interface IMessagesPeriod{
    date: string;
    messages: IMessage[]
}