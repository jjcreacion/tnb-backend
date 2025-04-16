import { Module } from '@nestjs/common';
import {ServicesTypeMapper} from "@/category/mapper/services/servicesType.mapper";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ServicesTypeEntity} from "@/category/entities/services/servicesType.entity";
import {ServiceAddonMapper} from "@/category/mapper/services/serviceAddon.mapper";
import {ServiceAddonEntity} from "@/category/entities/services/serviceAddon.entity";
import {ServiceAddonController} from "@/category/controller/services/serviceAddons.controller";
import {ServiceAddonService} from "@/category/service/services/serviceAddons.service";

@Module({
  imports: [
    ServiceAddonMapper,
    TypeOrmModule.forFeature([ServiceAddonEntity]),
  ],
  controllers: [ServiceAddonController],
  providers: [ServiceAddonService],
})
export class ServiceAddonsModule {}
