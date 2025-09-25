// src/referral/referral.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferralTrackingEntity } from './entities/referral-tracking.entity';
import { ReferralController } from './referral.controller';
import { ReferralService } from './referral.service';
import { UserEntity } from '../user/entities/user.entity'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReferralTrackingEntity,
      UserEntity, 
    ]),
  ],
  controllers: [ReferralController],
  providers: [ReferralService],
  exports: [ReferralService], 
})
export class ReferralModule {}