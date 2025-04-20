import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SubCategoryEntity} from "@/sub-category/entity/subCategory.entity";
import {CategoryModule} from "@/category/category.module";
import {SubCategoryController} from "@/sub-category/sub-Category.controller";
import {SubCategoryService} from "@/sub-category/sub-Category.service";

@Module({
  imports: [
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
