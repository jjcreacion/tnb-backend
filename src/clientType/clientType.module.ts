import { Module } from '@nestjs/common';
import {CategoryServicesMapperModule} from "@/category/mapper/services/categoryServices.mapper.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ClientTypeEntity} from "@/clientType/entities/clientType.entity";
import {ClientTypeMapper} from "@/clientType/mapper/clientType.mapper";
import {ClientTypeController} from "@/clientType/controller/clientType.controller";
import {ClientTypeService} from "@/clientType/service/clientType.service";

@Module({
  imports: [
    ClientTypeMapper,
    TypeOrmModule.forFeature([ClientTypeEntity]),
  ],
  controllers: [ClientTypeController],
  providers: [ClientTypeService],
})
export class ClientTypeModule {}
