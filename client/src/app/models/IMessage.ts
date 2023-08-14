import {IUser} from "@/models/IUserData";
import {IRoom} from "@/models/IRoom";

export interface IMessage{
    id: string;
    text: string;
    author: IUser;
    //room: IRoom;
    timestamp: string;
    isEdit: boolean;
}

export interface IEditableMessage {
    id: string;
    text: string;
}

export interface IMessagesPeriod{
    date: string;
    messages: IMessage[]
}