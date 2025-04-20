import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ServicesEntity} from "@/services/entity/services.entity";
import {SubCategoryModule} from "@/sub-category/sub-Category.module";
import {CategoryServicesService} from "@/services/services.service";

@Module({
  imports: [
    SubCategoryModule,
    TypeOrmModule.forFeature([ServicesEntity]),
  ],
  controllers: [ServicesController],
  providers: [CategoryServicesService],
})
export class ServicesModule {}
