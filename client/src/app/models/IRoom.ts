import {IUserData} from "@/models/IUserData";
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
    users?: IUserData[]
    messages: IMessage[]
}