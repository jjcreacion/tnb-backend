import { Module } from '@nestjs/common';
import { LocalityService } from './locality.service';
import { LocalityController } from './locality.controller';

@Module({
  controllers: [LocalityController],
  providers: [LocalityService],
})
export class LocalityModule {}
