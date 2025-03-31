import { Module } from '@nestjs/common';
import { ServiceService } from './service/service.service';
import { ServiceController } from './controller/service.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ServiceEntity} from "@/service/entities/service.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([ServiceEntity]),
  ],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
