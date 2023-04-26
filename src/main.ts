import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set Global Prefix Route
  app.setGlobalPrefix('api/v1')
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));

  await app.listen(3000);
}
bootstrap();
