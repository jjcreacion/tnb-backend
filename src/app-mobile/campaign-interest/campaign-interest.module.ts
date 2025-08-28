import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignInterestEntity } from './entities/campaign-interest.entity';
import { CampaignInterestService } from './campaign-interest.service';
import { UserEntity } from '../../user/entities/user.entity'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([CampaignInterestEntity, UserEntity]) 
  ],
  providers: [CampaignInterestService],
  exports: [CampaignInterestService], 
})
export class CampaignInterestModule {}