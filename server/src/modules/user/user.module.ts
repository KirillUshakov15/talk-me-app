import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";

import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {UserRepository} from "./user.repository";
import {UserEntity} from "./user.entity";

@Module({
    controllers: [UserController],
    providers: [UserService, UserRepository],
    imports: [
        TypeOrmModule.forFeature([
            UserEntity
        ])
    ],
    exports: [UserService]
})
export class UserModule {}