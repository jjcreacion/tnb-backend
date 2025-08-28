import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AddonsEntity} from "@/service-addons/entity/addons.entity";
import {ServiceAddonController} from "@/service-addons/service-addons.controller";
import {ServiceAddonService} from "@/service-addons/service-addons.service";
import { SubCategoryModule } from '@/sub-category/sub-category.module';

@Module({
  imports: [
    SubCategoryModule,
    TypeOrmModule.forFeature([AddonsEntity]),
  ],
  controllers: [ServiceAddonController],
  providers: [ServiceAddonService],
  exports:[ServiceAddonService]
})
export class ServiceAddonsModule {}
