import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // add validation input
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);

  // config swagger UI
  const configSwagger = new DocumentBuilder()
  .setTitle("API Youtube mini")
  .setDescription("Danh sách API youtube mini")
  .setVersion("1.0")
  .build(); // builder pattern


  const swagger = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup("swagger", app, swagger);

  await app.listen(configService.get<number>('PORT') || 8080);
}
bootstrap();

// javascript và typescript
// support code class component và  functional component
