import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RoomController} from "./room/room.controller";
import {RoomService} from "./room/room.service";
import {RoomRepository} from "./room/room.repository";
import {RoomEntity} from "./room/room.entity";
import {MessageService} from "./message/message.service";
import {MessageRepository} from "./message/message.repository";
import {MessageEntity} from "./message/message.entity";
import {MessengerGateway} from "./messenger.gateway";
import {TokenModule} from "../token/token.module";
import {UserModule} from "../user/user.module";
import {UserEntity} from "../user/user.entity";

@Module({
    controllers: [RoomController],
    providers: [MessengerGateway, RoomService, RoomRepository, MessageService, MessageRepository],
    imports: [
        TypeOrmModule.forFeature([
            RoomEntity,
            MessageEntity,
            UserEntity,
        ]),
        TokenModule,
        UserModule
    ],
    exports: [RoomService]
})
export class MessengerModule {}