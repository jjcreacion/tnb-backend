import { CategoryModule } from "@/category/category.module";
import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubCategoryEntity } from './entity/sub-category.entity';
import { SubCategoryController } from './sub-category.controller';
import { SubCategoryService } from './sub-category.service';

import { ClientTypeModule } from "@/client-type/client-type.module";
import { ServicesTypeModule } from "@/services-type/services-type.module";

@Module({
  imports: [
    CategoryModule,
    ServicesTypeModule,
    ClientTypeModule,
    TypeOrmModule.forFeature([SubCategoryEntity]),
  ],
  controllers: [SubCategoryController],
  providers: [SubCategoryService],
  exports:[SubCategoryService]
})
export class SubCategoryModule {}
