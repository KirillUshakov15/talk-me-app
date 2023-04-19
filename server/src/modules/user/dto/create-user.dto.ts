import {IsEmail, IsString, MinLength} from "class-validator";

export class CreateUserDto{
    @IsEmail()
    @MinLength(2)
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    confirmPassword: string;

    @IsString()
    @MinLength(2)
    firstName: string;

    @IsString()
    @MinLength(2)
    secondName: string;
}