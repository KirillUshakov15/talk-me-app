import {IsString, MinLength} from "class-validator";

export class EditUserDto{
    id: string;

    @IsString()
    @MinLength(2)
    firstName: string;

    @IsString()
    @MinLength(2)
    secondName: string;

    avatarUrl: string;

    deletableAvatar?: string;
}