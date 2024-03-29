import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 5000

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.API_CLIENT_URL,
    credentials: true
  });
  app.use(cookieParser())

  await app.listen(PORT, () => {
    console.log(`Server successfully started on port ${PORT}`)
  });
}

bootstrap();
