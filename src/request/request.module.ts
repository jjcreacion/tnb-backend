import { Module } from '@nestjs/common';
import { RequestService } from './services/request.service';
import { RequestController } from './request.controller';
import {RequestLocationService} from "@/request/services/requestLocation.service";
import {RequestImagesService} from "@/request/services/requestImages.service";
import {RequestPriorityService} from "@/request/services/requestPriority.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RequestEntity} from "@/request/entities/request.entity";
import {RequestLocationEntity} from "@/request/entities/requestLocation.entity";
import {RequestImageEntity} from "@/request/entities/requestImages.entity";
import {RequestPriorityEntity} from "@/request/entities/requestPriority.entity";
import {PersonModule} from "@/person/person.module";
import {CategoryModule} from "@/category/category.module";
import {SubCategoryModule} from "@/sub-category/sub-category.module";
import {CountryModule} from "@/country/country.module";
import {CountryStatesModule} from "@/country-states/country-states.module";
import {LocalityModule} from "@/locality/locality.module";
import {ServiceAddonsModule} from "@/service-addons/service-addons.module";
import {OptionalParseIntPipe} from "@/utils/pipes/optional-parse-int.pipe";

@Module({
  imports: [
      CategoryModule,
      SubCategoryModule,
      CountryModule,
      CountryStatesModule,
      LocalityModule,
      ServiceAddonsModule,
    PersonModule,
    TypeOrmModule.forFeature([RequestEntity]),
    TypeOrmModule.forFeature([RequestLocationEntity]),
    TypeOrmModule.forFeature([RequestImageEntity]),
    TypeOrmModule.forFeature([RequestPriorityEntity]),
  ],
  controllers: [RequestController],
  providers: [
    OptionalParseIntPipe,
    RequestService,
    RequestLocationService,
    RequestImagesService,
    RequestPriorityService,

  ],
})
export class RequestModule {}
