import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ServicesEntity} from "@/services/entity/services.entity";
import {SubCategoryModule} from "@/sub-category/sub-Category.module";
import {CategoryServicesService} from "@/services/services.service";
import {ServicesTypeModule} from "@/services-type/services-type.module";
import {ClientTypeModule} from "@/client-type/client-type.module";

@Module({
  imports: [
    SubCategoryModule,
    ServicesTypeModule,
    ClientTypeModule,
    TypeOrmModule.forFeature([ServicesEntity]),
  ],
  controllers: [ServicesController],
  providers: [CategoryServicesService],
  exports:[CategoryServicesService]
})
export class ServicesModule {}
