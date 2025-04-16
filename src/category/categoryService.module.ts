import { Module } from '@nestjs/common';
import { CategoryServicesController } from './controller/services/categoryServices.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CategoryServicesEntity} from "@/category/entities/services/categoryServices.entity";
import {CategoryServicesMapperModule} from "@/category/mapper/services/categoryServices.mapper.module";
import {CategoryServicesService} from "@/category/service/services/categoryService.service";

@Module({
  imports: [
    CategoryServicesMapperModule,
    TypeOrmModule.forFeature([CategoryServicesEntity]),
  ],
  controllers: [CategoryServicesController],
  providers: [CategoryServicesService],
})
export class CategoryServiceModule {}
