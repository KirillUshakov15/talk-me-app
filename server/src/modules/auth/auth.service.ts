import {Injectable} from "@nestjs/common";
import {UserService} from "../user/user.service";
import * as bcrypt from "bcryptjs"
import {TokenService} from "../token/token.service";
import {ApiError} from "../../api-error/api-error";
import {AuthUserDto} from "./dto/auth-user.dto";
import {IAuth} from "./IAuth";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {Response} from "express";

@Injectable()
export class AuthService{

    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService
    ) {}

    async login(authData: AuthUserDto): Promise<IAuth>{
        const {email, password} = authData;

        const user = await this.userService.findByEmail(email);

        if(user){
            const passwordsIsEqual = await bcrypt.compare(password, user.password);

            if(passwordsIsEqual){
                return await this.tokenService.generate(user)
            }
        }

        throw ApiError.BadRequest('Неверный email или пароль')
    }

    async registration(data: CreateUserDto): Promise<IAuth>{
        const candidate = await this.userService.findByEmail(data.email);

        if(candidate) throw ApiError.BadRequest('Пользователь с указанным Email уже зарегистрирован')
        if(data.password !== data.confirmPassword) throw ApiError.BadRequest('Введенные пароли не совпадают')

        const passwordHash = await bcrypt.hash(data.password, 5)

        const user = await this.userService.create({...data, password: passwordHash});

        return await this.tokenService.generate(user)
    }

    async logout(refreshToken: string){
        return this.tokenService.delete(refreshToken)
    }

    async refreshAccess(refreshToken: string): Promise<IAuth>{

        if(!refreshToken) throw ApiError.Unauthorised()

        const tokenIsExist = await this.tokenService.find(refreshToken);
        const tokenIsValid = await this.tokenService.validate(refreshToken, process.env.REFRESH_TOKEN_KEY)

        if(!tokenIsValid || !tokenIsExist) throw ApiError.Unauthorised()

        const user = await this.userService.findByEmail(tokenIsValid.email);
        return this.tokenService.generate(user);
    }

    saveCookie(res: Response, refreshToken: string){
        res.cookie('token', refreshToken, { httpOnly: true, secure: false });
    }
}