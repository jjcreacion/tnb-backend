// src/referral/referral.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReferralTrackingEntity } from './entities/referral-tracking.entity';
import { ReferralClaimResponseDto } from './dto/referral-tracking.dto';

@Injectable()
export class ReferralService {
  constructor(
    @InjectRepository(ReferralTrackingEntity)
    private referralTrackingRepository: Repository<ReferralTrackingEntity>,
  ) {}

  async saveReferralCode(referralCode: string): Promise<string> {
    const entry = this.referralTrackingRepository.create({ referralCode });
    const savedEntry = await this.referralTrackingRepository.save(entry);
    
    return savedEntry.id; 
  }

  async claimReferralCode(trackingId: string): Promise<ReferralClaimResponseDto> {
    const entry = await this.referralTrackingRepository.findOne({
      where: { id: trackingId, isClaimed: false },
    });

    if (!entry) {
      throw new NotFoundException(
        'Tracking ID no encontrado o código ya reclamado.',
      );
    }

    entry.isClaimed = true;
    await this.referralTrackingRepository.save(entry);

    return {
      trackingId: entry.id,
      referralCode: entry.referralCode,
      success: true,
    };
  }
}