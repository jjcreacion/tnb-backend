import { Module } from '@nestjs/common';
import { CategoryService } from './service/category.service';
import { CategoryController } from './controller/category.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SubCategoryEntity} from "@/category/entities/subCategory.entity";
import {SubCategoryController} from "@/category/controller/subCategory.controller";
import {SubCategoryService} from "@/category/service/subCategory.service";
import {CategoryMapper} from "@/category/mapper/category.mapper";
import {SubCategoryMapper} from "@/category/mapper/subCategory.mapper";
import {CategoryModule} from "@/category/category.module";

@Module({
  imports: [
      SubCategoryMapper,
      CategoryModule,
    TypeOrmModule.forFeature([SubCategoryEntity]),
  ],
  controllers: [SubCategoryController],
  providers: [
      SubCategoryService,
    ],
  exports:[SubCategoryService]
})
export class SubCategoryModule {}
