import 'dotenv/config';
import 'module-alias/register';
import 'reflect-metadata';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from '@app/app.module';
import { EnvService } from '@app/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(EnvService.get().API_BASE_PATH);

  const options = new DocumentBuilder()
    .setTitle('Nest API')
    .setDescription('The Nest API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(EnvService.get().API_PORT, EnvService.get().API_HOST);
}
bootstrap();
