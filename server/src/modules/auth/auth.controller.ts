import {Body, Controller, Get, Post, Req, Res, UsePipes} from "@nestjs/common";
import {Response, Request} from "express";
import {AuthUserDto} from "./dto/auth-user.dto";
import {AuthService} from "./auth.service";
import {IAuth} from "./IAuth";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {ValidationPipe} from "../../pipes/validation.pipe";

@Controller('auth')
export class AuthController{

    constructor(private readonly authService: AuthService) {}

    @Post('/login')
    @UsePipes(ValidationPipe)
    async login(@Body() authData: AuthUserDto, @Res({ passthrough: true }) res: Response): Promise<IAuth>{
        const data = await this.authService.login(authData);
        this.authService.saveCookie(res, data.refreshToken)
        return data;
    }

    @Post('/registration')
    @UsePipes(ValidationPipe)
    async registration(@Body() userData: CreateUserDto, @Res({ passthrough: true }) res: Response): Promise<IAuth>{
        const data = await this.authService.registration(userData);
        this.authService.saveCookie(res, data.refreshToken)
        return data;
    }

    @Get('/logout')
    async logout(@Req() req: Request){
        const {token} = req.cookies;
        return await this.authService.logout(token);
    }

    @Get('/refresh-access')
    async refreshAccess(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<IAuth>{
        const {token} = req.cookies;
        const data = await this.authService.refreshAccess(token);
        this.authService.saveCookie(res, data.refreshToken)
        return data;
    }
}