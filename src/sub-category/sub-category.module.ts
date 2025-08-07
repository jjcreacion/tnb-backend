import { Module } from '@nestjs/common';
import { SubCategoryController } from './sub-category.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import { SubCategoryEntity } from './entity/sub-category.entity';
import {CategoryModule} from "@/category/category.module";
import { SubCategoryService } from './sub-category.service';

import {ServicesTypeModule} from "@/services-type/services-type.module";
import {ClientTypeModule} from "@/client-type/client-type.module";

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
