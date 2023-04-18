import {IUserData} from "../user/IUser";

export interface IAuth {
    accessToken: string;
    refreshToken: string;
    userData: IUserData;
}