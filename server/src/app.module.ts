import { Module } from '@nestjs/common';
import {PostgresDatabaseInit} from "./database/database.init";
import {EnvironmentInit} from "./environment/environment.init";
import Modules from "./modules";
import {StaticFilesInit} from "./file-uploader/static-files.init";
import {MulterModule} from "@nestjs/platform-express";

@Module({
  imports: [
      EnvironmentInit,
      PostgresDatabaseInit,
      StaticFilesInit,
      MulterModule.register({
          dest: './uploads'
      }),
      ...Modules
  ],
})
export class AppModule {}
