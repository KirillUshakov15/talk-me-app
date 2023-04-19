import {Body, Controller, Get, Param, Post, Query, UseGuards, UsePipes} from "@nestjs/common";
import {CreateRoomDto} from "./dto/create-room.dto";
import {RoomService} from "./room.service";
import {QueryRoomsDto} from "./dto/query-rooms.dto";
import {CheckAuthGuard} from "../../../guards/check-auth.guard";
import {ValidationPipe} from "../../../pipes/validation.pipe";

@Controller('room')
export class RoomController{

    constructor(private readonly roomService: RoomService) {}

    @Post('/')
    @UseGuards(CheckAuthGuard)
    @UsePipes(ValidationPipe)
    async create(@Body() data: CreateRoomDto){
        return await this.roomService.create(data);
    }

    @Get('/all')
    @UseGuards(CheckAuthGuard)
    async getAll(@Query() queryRoomsDto: QueryRoomsDto){
        return this.roomService.getAll(queryRoomsDto)
    }

    @Get('/:id')
    @UseGuards(CheckAuthGuard)
    async getOne(@Param('id') id: string){
        return this.roomService.getOne(id)
    }
}