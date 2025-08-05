import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CampaignInterestEntity } from './entities/campaign-interest.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Injectable()
export class CampaignInterestService {
  constructor(
    @InjectRepository(CampaignInterestEntity)
    private readonly campaignInterestRepository: Repository<CampaignInterestEntity>,
    @InjectRepository(UserEntity) 
    private readonly userRepository: Repository<UserEntity>,
  ) {}


  async createInterest(
    campaignId: number,
    userId: number | string, 
    ipAddress?: string,
    userAgent?: string
  ): Promise<CampaignInterestEntity> {
    const user = await this.userRepository.findOne({ where: { pkUser: userId as any } }); 
    if (!user) {
      throw new HttpException(`Usuario con ID ${userId} no encontrado.`, HttpStatus.NOT_FOUND);
    }

    const newInterest = this.campaignInterestRepository.create({
      campaignId,
      user, 
      fkUserId: user.pkUser as number, 
      ipAddress,
      userAgent,
    });
    return this.campaignInterestRepository.save(newInterest);
  }

   async findInterestsByCampaign(campaignId: number): Promise<CampaignInterestEntity[]> {
    return this.campaignInterestRepository.find({
      where: { campaignId },
      relations: ['user', 'campaign', 'user.person', 'user.person.contacts'], 
      order: { expressedAt: 'DESC' },
    });
  }

  async countInterestsByCampaign(campaignId: number): Promise<number> {
    return this.campaignInterestRepository.count({
      where: { campaignId },
    });
  }

  async findLast10Interests(): Promise<CampaignInterestEntity[]> {
    return this.campaignInterestRepository.find({
      order: { expressedAt: 'DESC' }, 
      take: 10,
      relations: ['user', 'campaign', 'user.person', 'user.person.contacts'], 
    });
  }

  
}