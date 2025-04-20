import { Module } from '@nestjs/common';
import { LocalityService } from './locality.service';
import { LocalityController } from './locality.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {LocalityEntity} from "@/locality/entities/locality.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([LocalityEntity]),
  ],
  controllers: [LocalityController],
  providers: [LocalityService],
})
export class LocalityModule {}
