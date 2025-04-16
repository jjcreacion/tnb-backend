import { Module } from '@nestjs/common';
import { CountryStatesService } from './country-states.service';
import { CountryStatesController } from './country-states.controller';

@Module({
  controllers: [CountryStatesController],
  providers: [CountryStatesService],
})
export class CountryStatesModule {}
