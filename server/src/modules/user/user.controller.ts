import {
    Body,
    Controller,
    Get,
    Patch,
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    UsePipes
} from "@nestjs/common";
import {UserService} from "./user.service";
import {CheckAuthGuard} from "../../guards/check-auth.guard";
import {EditUserDto} from "./dto/edit-user.dto";
import {User} from "../../decorators/User";
import {IUser, IUserData} from "./IUser";
import {EditPasswordDto} from "./dto/edit-password.dto";
import {ValidationPipe} from "../../pipes/validation.pipe";
import {FileInterceptor} from "@nestjs/platform-express";
import {FileType, storage} from "../../file-uploader/storage";

@Controller('user')
export class UserController{

    constructor(private readonly userService: UserService) {}

    @Get('/')
    @UseGuards(CheckAuthGuard)
    async getOne(@Query('id') id: string){
        return await this.userService.getOne(id);
    }

    @Get('/rooms')
    @UseGuards(CheckAuthGuard)
    async getRooms(@User() user: IUserData){
        return await this.userService.getRooms(user.id)
    }

    @Patch('/edit-profile')
    @UseGuards(CheckAuthGuard)
    @UsePipes(ValidationPipe)
    @UseInterceptors(FileInterceptor('avatar', storage(FileType.IMAGE)))
    async edit(
        @UploadedFile() avatar: Express.Multer.File,
        @Body() editUserData: EditUserDto,
        @User() user: IUser
    ){
        return await this.userService.edit(user.id, {...editUserData, avatarUrl: avatar?.filename})
    }

    @Patch('/edit-password')
    @UseGuards(CheckAuthGuard)
    @UsePipes(ValidationPipe)
    async editPassword(@Body() editPasswordData: EditPasswordDto, @User() user: IUser){
        return await this.userService.editPassword(user.email, editPasswordData)
    }

}