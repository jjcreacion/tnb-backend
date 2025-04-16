
import {  NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as process from "process";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {

  const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || [];


  const app = await NestFactory.create(
      AppModule
  );

  const configSwagger = new DocumentBuilder()
      .setTitle('Documentación TNB-Backend')
      .setDescription('Se busca facilitar la información de los endpoints disponibles para ...')
      .setVersion('1.0')
      .addTag('tag')
      .build();

  const documentFactory = () => SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('doc', app, documentFactory);

  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true
      })
  )

  app.enableCors({
    origin:  allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })

  await app.listen(process.env.PORT ?? 5641);
}
bootstrap();
