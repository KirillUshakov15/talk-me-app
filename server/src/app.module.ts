import { Module } from '@nestjs/common';
import {PostgresDatabaseInit} from "./database/database.init";
import {EnvironmentInit} from "./environment/environment.init";
import Modules from "./modules";

@Module({
  imports: [
      EnvironmentInit,
      PostgresDatabaseInit,
      ...Modules
  ],
})
export class AppModule {}
