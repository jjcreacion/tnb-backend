import { Module } from '@nestjs/common';
import { LocalityTypeService } from './locality-type.service';
import { LocalityTypeController } from './locality-type.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {LocalityTypeEntity} from "@/locality-type/entities/localityType.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([LocalityTypeEntity]),
  ],
  controllers: [LocalityTypeController],
  providers: [LocalityTypeService],
})
export class LocalityTypeModule {}
