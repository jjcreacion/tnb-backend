import { Module } from '@nestjs/common';
import { CountryStateService } from './country-states.service';
import { CountryStateController } from './country-states.controller';

@Module({
  controllers: [CountryStateController],
  providers: [CountryStateService],
})
export class CountryStatesModule {}
