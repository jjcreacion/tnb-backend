import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MobileCampaignService } from './campaigns.service'; 
import { MobileCampaignController } from './campaigns.controller'; 
import { RequestEntity } from './entities/campaigns.entity'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([RequestEntity]),
   ],
  controllers: [MobileCampaignController],
  providers: [MobileCampaignService],
  exports: [MobileCampaignService], 
})
export class MobileCampaignModule {}