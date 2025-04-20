import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AddonsEntity} from "@/service-addons/entity/addons.entity";
import {ServiceAddonController} from "@/service-addons/service-addons.controller";
import {ServiceAddonService} from "@/service-addons/service-addons.service";
import {ServicesModule} from "@/services/services.module";

@Module({
  imports: [
      ServicesModule,
    TypeOrmModule.forFeature([AddonsEntity]),
  ],
  controllers: [ServiceAddonController],
  providers: [ServiceAddonService],
})
export class ServiceAddonsModule {}
