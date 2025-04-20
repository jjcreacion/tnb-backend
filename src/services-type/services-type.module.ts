import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ServicesTypeController} from "@/services-type/services-type.controller";
import {ServicesTypeService} from "@/services-type/services-type.service";
import {ServicesTypeEntity} from "@/services-type/entity/services-type.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([ServicesTypeEntity]),
  ],
  controllers: [ServicesTypeController],
  providers: [ServicesTypeService],
})
export class ServicesTypeModule {}
