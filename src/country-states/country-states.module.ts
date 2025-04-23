import { Module } from '@nestjs/common';
import { CountryStateService } from './country-states.service';
import { CountryStateController } from './country-states.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CountryStateEntity} from "@/country-states/entities/country-states.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([CountryStateEntity]),
  ],
  controllers: [CountryStateController],
  providers: [CountryStateService],
  exports:[CountryStateService]
})
export class CountryStatesModule {}
