import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import 'dotenv/config'

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(false);
  app.enableCors();
  app.setGlobalPrefix('api'); // www.website.com/api/users
  app.useGlobalPipes(new ValidationPipe({ transform: true })); // JSON->JS object (and more)
  app.useGlobalInterceptors( // Allows the use of class-transform and class validator
    new ClassSerializerInterceptor(app.get(Reflector))
  );
  await app.listen(process.env.BACKEND_PORT || 3000);
}

bootstrap();