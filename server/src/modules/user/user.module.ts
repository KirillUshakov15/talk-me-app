import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";

import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {UserRepository} from "./user.repository";
import {UserEntity} from "./user.entity";
import {TokenModule} from "../token/token.module";
import {MessengerModule} from "../messenger/messenger.module";

@Module({
    controllers: [UserController],
    providers: [UserService, UserRepository],
    imports: [
        TypeOrmModule.forFeature([
            UserEntity
        ]),
        TokenModule,
        MessengerModule
    ],
    exports: [UserService]
})
export class UserModule {}