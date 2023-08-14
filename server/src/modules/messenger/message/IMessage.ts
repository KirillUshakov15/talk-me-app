import {IUser} from "../../user/IUser";
import {IRoom} from "../room/IRoom";

export interface IMessage{
    id: string;
    text: string;
    author: IUser;
    //room: IRoom;
    timestamp: string;
    isEdit: boolean;
}

export interface IMessagesPeriod{
    date: string;
    messages: IMessage[]
}