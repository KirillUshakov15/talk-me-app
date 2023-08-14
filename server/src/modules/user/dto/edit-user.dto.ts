import {IsString, MinLength} from "class-validator";

export class EditUserDto{
    @IsString()
    @MinLength(2)
    firstName: string;

    @IsString()
    @MinLength(2)
    secondName: string;

    avatarUrl: string;
}