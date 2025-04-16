import { Module } from '@nestjs/common';
import { LocalityTypeService } from './locality-type.service';
import { LocalityTypeController } from './locality-type.controller';

@Module({
  controllers: [LocalityTypeController],
  providers: [LocalityTypeService],
})
export class LocalityTypeModule {}
