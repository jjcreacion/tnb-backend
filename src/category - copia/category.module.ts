import { Module } from '@nestjs/common';
import { CategoryService } from './service/category.service';
import { CategoryController } from './controller/category.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CategoryEntity} from "@/category/entities/category.entity";
import {CategoryMapperModule} from "@/category/mapper/category.mapper.module";

@Module({
  imports: [
      CategoryMapperModule,
    TypeOrmModule.forFeature([CategoryEntity]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports:[CategoryService]
})
export class CategoryModule {}
