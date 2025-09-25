// src/referral/mapper/referral-tracking.mapper.ts

import { ReferralTrackingEntity } from '../entities/referral-tracking.entity';
import { ReferralTrackingDto } from '../dto/referral-tracking.dto';

export class ReferralTrackingMapper {
  
  public static toDto(entity: ReferralTrackingEntity): ReferralTrackingDto {
    
    const dto = new ReferralTrackingDto();
    dto.id = entity.id;
    dto.referralCode = entity.referralCode;
    dto.isClaimed = entity.isClaimed;
    dto.createdAt = entity.createdAt;

    return dto;
  }
}