import {Body, Controller, Get, Param, Post, Query, UseGuards, UsePipes} from "@nestjs/common";
import {CreateRoomDto} from "./dto/create-room.dto";
import {RoomService} from "./room.service";
import {QueryRoomDto} from "./dto/query-room.dto";
import {CheckAuthGuard} from "../../../guards/check-auth.guard";
import {ValidationPipe} from "../../../pipes/validation.pipe";
import {User} from "../../../decorators/User";
import {IUserData} from "../../user/IUser";

@Controller('room')
export class RoomController{

    constructor(private readonly roomService: RoomService) {}

    @Post('/')
    @UseGuards(CheckAuthGuard)
    @UsePipes(ValidationPipe)
    async create(@Body() data: CreateRoomDto, @User() user: IUserData){
        return await this.roomService.create(data, user.id);
    }

    @Get('/')
    @UseGuards(CheckAuthGuard)
    async getOne(@Query() queryRoomDto: QueryRoomDto){
        return this.roomService.getOne(queryRoomDto.id)
    }
}