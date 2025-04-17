import { Module } from '@nestjs/common';
import { ServicesTypeService } from './service/services/servicesType.service';
import {ServicesTypeController} from "@/category/controller/services/servicesTypeController";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ServicesTypeMapper} from "@/category/mapper/services/servicesType.mapper";
import {ServicesTypeEntity} from "@/category/entities/services/servicesType.entity";

@Module({
  imports: [
    ServicesTypeMapper,
    TypeOrmModule.forFeature([ServicesTypeEntity]),
  ],
  controllers: [ServicesTypeController],
  providers: [ServicesTypeService],
})
export class ServicesTypeModule {}
