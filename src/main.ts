import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as process from "process";
import { ValidationPipe } from "@nestjs/common";
import { IoAdapter } from '@nestjs/platform-socket.io'; 

async function bootstrap() {

  const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || [];

  const app = await NestFactory.create(
      AppModule
  );

  app.useWebSocketAdapter(new IoAdapter(app)); 
 
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
        forbidNonWhitelisted: true,
        transform: true, 
        transformOptions: {
          enableImplicitConversion: true, 
        },
      })
  );

  app.enableCors({
    origin:  true, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 12099);
}
bootstrap();