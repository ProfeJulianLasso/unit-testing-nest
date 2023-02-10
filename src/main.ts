// Libraries
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

// Main module
import { AppModule } from './app.module';

// Configurations
import { PipeValidator } from './configs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe(PipeValidator));
  await app.listen(3000);
}
bootstrap();
