import {
    Body,
    Controller,
    Get,
    Param, Patch,
    Post,
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    UsePipes
} from "@nestjs/common";
import {CreateRoomDto} from "./dto/create-room.dto";
import {RoomService} from "./room.service";
import {QueryRoomDto, QueryRoomsDto} from "./dto/query-room.dto";
import {CheckAuthGuard} from "../../../guards/check-auth.guard";
import {ValidationPipe} from "../../../pipes/validation.pipe";
import {User} from "../../../decorators/User";
import {IUser, IUserData} from "../../user/IUser";
import {FileInterceptor} from "@nestjs/platform-express";
import {FileType, storage} from "../../../file-uploader/storage";
import {EditRoomDto} from "./dto/edit-room.dto";

@Controller('room')
export class RoomController{

    constructor(
        private readonly roomService: RoomService
    ) {}

    @Post('/')
    @UseGuards(CheckAuthGuard)
    @UsePipes(ValidationPipe)
    @UseInterceptors(FileInterceptor('icon', storage(FileType.IMAGE)))
    async create(@UploadedFile() icon: Express.Multer.File, @Body() data: CreateRoomDto, @User() user: IUserData){
        const users = data.ids.map(id => {return {id: id}})
        return await this.roomService.create({...data, users, icon: icon?.filename}, user.id);
    }

    @Patch('/')
    @UseGuards(CheckAuthGuard)
    @UseInterceptors(FileInterceptor('icon', storage(FileType.IMAGE)))
    async edit(@UploadedFile() icon: Express.Multer.File, @Body() editData: EditRoomDto){
        return await this.roomService.edit({...editData, icon: icon?.filename});
    }

    @Get('/')
    @UseGuards(CheckAuthGuard)
    async getOne(@Query() queryRoomDto: QueryRoomDto, @User() user: IUser){
        return this.roomService.getOne({...queryRoomDto, userID: user.id})
    }

    @Get('/all')
    @UseGuards(CheckAuthGuard)
    async getAll(@Query() queryRoomsDto: QueryRoomsDto, @User() user: IUser){
        return this.roomService.getAll({...queryRoomsDto, userID: user.id})
    }
}