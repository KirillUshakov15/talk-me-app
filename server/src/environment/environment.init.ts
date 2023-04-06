import {ConfigModule} from "@nestjs/config";

export const EnvironmentInit = ConfigModule.forRoot({
    envFilePath: `.${process.env.NODE_ENV}.env`
})