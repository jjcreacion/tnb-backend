import { Module } from '@nestjs/common';
import { CategoryServicesController } from './controller/services/categoryServices.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CategoryServicesEntity} from "@/category/entities/services/categoryServices.entity";
import {CategoryServicesService} from "@/category/service/services/categoryService.service";
import {SubCategoryModule} from "@/category/subCategory.module";

@Module({
  imports: [
    SubCategoryModule,
    TypeOrmModule.forFeature([CategoryServicesEntity]),
  ],
  controllers: [CategoryServicesController],
  providers: [CategoryServicesService],
})
export class CategoryServiceModule {}
