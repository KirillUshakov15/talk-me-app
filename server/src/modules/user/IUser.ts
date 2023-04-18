
export interface IUserData {
    id: string;
    email: string;
    firstName: string;
    secondName: string;
}

export interface IUser extends IUserData{
    password: string;
    avatarUrl: string;
    online: boolean;
}