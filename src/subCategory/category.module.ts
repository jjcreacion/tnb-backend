import { Module } from '@nestjs/common';
import { SubCategoryService } from './service/subcategory.service';
import { SubCategoryController } from './controller/subcategory.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubCategoryEntity } from "@/subcategory/entities/category.entity";
import { SubCategoryMapperModule } from "@/subcategory/submapper/category.mapper.module";

@Module({
  imports: [
      SubCategoryMapperModule,
    TypeOrmModule.forFeature([SubCategoryEntity]),
  ],
  controllers: [SubCategoryController],
  providers: [SubCategoryService],
  exports: [SubCategoryService]
})

export class SubCategoryModule {}
