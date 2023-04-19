import {UserModule} from "./user/user.module";
import {TokenModule} from './token/token.module'
import {AuthModule} from './auth/auth.module'
import {MessengerModule} from "./messenger/messenger.module";

export default [
    UserModule,
    TokenModule,
    AuthModule,
    MessengerModule
]