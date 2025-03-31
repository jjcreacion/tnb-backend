import { Module } from '@nestjs/common';
import { RequestService } from './services/request.service';
import { RequestController } from './controller/request.controller';
import {RequestLocationService} from "@/request/services/requestLocation.service";
import {RequestImagesService} from "@/request/services/requestImages.service";
import {RequestPriorityService} from "@/request/services/requestPriority.service";
import {PersonService} from "@/person/service/person.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RequestEntity} from "@/request/entities/request.entity";
import {RequestMapperModule} from "@/request/mapper/request.mapper.module";
import {RequestLocationEntity} from "@/request/entities/requestLocation.entity";
import {RequestImageEntity} from "@/request/entities/requestImages.entity";
import {RequestPriorityEntity} from "@/request/entities/requestPriority.entity";
import {PersonModule} from "@/person/person.module";

@Module({
  imports: [
    RequestMapperModule,
    PersonModule,
    TypeOrmModule.forFeature([RequestEntity]),
    TypeOrmModule.forFeature([RequestLocationEntity]),
    TypeOrmModule.forFeature([RequestImageEntity]),
    TypeOrmModule.forFeature([RequestPriorityEntity]),
  ],
  controllers: [RequestController],
  providers: [
    RequestService,
    RequestLocationService,
    RequestImagesService,
    RequestPriorityService,

  ],
})
export class RequestModule {}
