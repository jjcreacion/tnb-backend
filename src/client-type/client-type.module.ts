import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ClientTypeEntity} from "@/client-type/entities/clientType.entity";
import {ClientTypeMapper} from "@/client-type/mapper/clientType.mapper";
import {ClientTypeController} from "@/client-type/client-type.controller";
import {ClientTypeService} from "@/client-type/client-type.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientTypeEntity]),
  ],
  controllers: [ClientTypeController],
  providers: [ClientTypeService],
})
export class ClientTypeModule {}
