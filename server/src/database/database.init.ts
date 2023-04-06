import {TypeOrmModule} from "@nestjs/typeorm";
import Repositories from "./database.repositories";

export const PostgresDatabaseInit = TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1479253',
    database: 'talk-me-database',
    entities: Repositories,
    synchronize: true,
})