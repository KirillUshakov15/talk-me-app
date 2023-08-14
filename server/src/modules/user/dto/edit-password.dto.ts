import {IsNotEmpty, IsString, MinLength} from "class-validator";

export class EditPasswordDto{
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @MinLength(6)
    newPassword: string;

    @IsString()
    @IsNotEmpty()
    confirmPassword: string;
}