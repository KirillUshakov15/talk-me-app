import {Module} from "@nestjs/common";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {TokenModule} from "../token/token.module";
import {UserModule} from "../user/user.module";

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [TokenModule, UserModule]
})
export class AuthModule {}