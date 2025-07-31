import { CampaignInterestEntity } from '../entities/campaign-interest.entity';
import { ReadCampaignInterestDto } from '../dto/read-campaigns-interest.dto';

export class MobileCampaignMapper {
  static entityToReadDto(entity: CampaignInterestEntity): ReadCampaignInterestDto {
    const dto = new ReadCampaignInterestDto();
    dto.pk_interests = entity.pk_interests;
    dto.expressedAt = entity.expressedAt;
    dto.user = entity.user; 
    dto.campaign = entity.campaign ?? undefined;
    return dto;
  } 
}