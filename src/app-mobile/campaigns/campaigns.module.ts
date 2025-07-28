import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MobileCampaignService } from './campaigns.service'; 
import { MobileCampaignController } from './campaigns.controller'; 
import { campaignEntity } from './entities/campaigns.entity'; 
import { MobileCampaignGateway } from './mobile-campaign.gateway';
import { CampaignInterestModule } from '../campaign-interest/campaign-interest.module'; 
import { UserModule } from '../../user/user.module'; 


@Module({
  imports: [
    TypeOrmModule.forFeature([campaignEntity]),
    CampaignInterestModule, 
    UserModule, 
   ],
  controllers: [MobileCampaignController],
  providers: [MobileCampaignService, MobileCampaignGateway],
  exports: [MobileCampaignService], 
})
export class MobileCampaignModule {}