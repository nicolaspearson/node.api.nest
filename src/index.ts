import 'dotenv/config';
import 'module-alias/register';
import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';

import { AppModule } from '@app/app.module';
import { EnvService } from '@app/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(EnvService.get().API_BASE_PATH);
  await app.listen(EnvService.get().API_PORT, EnvService.get().API_HOST);
}
bootstrap();