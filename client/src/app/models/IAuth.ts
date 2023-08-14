import {IUserData} from "@/models/IUserData";

export interface IAuth{
    accessToken: string,
    refreshToken: string,
    userData: IUserData
}

export interface IRegistration{
    email: string;
    firstName: string;
    secondName: string;
    password: string;
    confirmPassword: string;
}

export interface ILogin{
    email: string;
    password: string;
}