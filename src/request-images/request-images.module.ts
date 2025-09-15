import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestImageEntity } from './entities/request-image.entity';
import { RequestImagesController } from './request-images.controller';
import { RequestImagesService } from './request-images.service';

@Module({
  imports: [TypeOrmModule.forFeature([RequestImageEntity])],
  controllers: [RequestImagesController],
  providers: [RequestImagesService],
  exports: [RequestImagesService],
})
export class RequestImagesModule {}

