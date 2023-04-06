import { Module } from '@nestjs/common';
import {PostgresDatabaseInit} from "./database/database.init";
import {EnvironmentInit} from "./environment/environment.init";

@Module({
  imports: [
      EnvironmentInit,
      PostgresDatabaseInit,
  ],
})
export class AppModule {}
