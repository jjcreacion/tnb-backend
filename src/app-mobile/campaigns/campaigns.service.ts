import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { ValidID } from '@/utils/validID'; 
import { RequestEntity } from './entities/campaigns.entity'; 
import { CreateMobileCampaignDto } from './dto/create-campaigns.dto';
import { ReadMobileCampaignDto } from './dto/read-campaigns.dto';
import { UpdateMobileCampaignDto } from './dto/update-campaigns.dto';
import { MobileCampaignMapper } from './mapper/campaigns.mapper'; 

@Injectable()
export class MobileCampaignService {
  constructor(
    @InjectRepository(RequestEntity)
    private readonly mobileCampaignRepository: Repository<RequestEntity>,
  ) {}

  async create(createMobileCampaignDto: CreateMobileCampaignDto): Promise<ReadMobileCampaignDto> {
    const newCampaignEntity = MobileCampaignMapper.createDtoToEntity(createMobileCampaignDto);
    const savedCampaign = await this.mobileCampaignRepository.save(newCampaignEntity);
    return MobileCampaignMapper.entityToReadDto(savedCampaign);
  }

  async findOne(validId: ValidID): Promise<ReadMobileCampaignDto> {
    const entity = await this.mobileCampaignRepository.findOne({
      where: { campaignsId: validId.id }, 
    });
    if (!entity) {
      throw new HttpException(
        `Campaña con ID ${validId.id} no encontrada.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return MobileCampaignMapper.entityToReadDto(entity);
  }

  async findAll(): Promise<ReadMobileCampaignDto[]> {
    const entities = await this.mobileCampaignRepository.find({
      order: {
        createdAt: 'DESC', 
      },
    });
    return entities.map((entity) => MobileCampaignMapper.entityToReadDto(entity));
  }

  async findActiveCampaigns(): Promise<ReadMobileCampaignDto[]> {
    const currentDate = new Date();
    const entities = await this.mobileCampaignRepository.find({
      where: {
        isActive: true,
        startDate: LessThanOrEqual(currentDate), 
        endDate: MoreThanOrEqual(currentDate),  
      },
      order: {
        createdAt: 'DESC',
      },
    });
    return entities.map((entity) => MobileCampaignMapper.entityToReadDto(entity));
  }
 
  async remove(id: number): Promise<{ message: string; status: HttpStatus }> {
    const campaignToDelete = await this.mobileCampaignRepository.findOneBy({
      campaignsId: id, 
    });

    if (!campaignToDelete) {
      throw new HttpException(
        `Campaña con ID ${id} no encontrada.`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.mobileCampaignRepository.remove(campaignToDelete); 

    return {
      message: 'Campaña eliminada exitosamente.',
      status: HttpStatus.OK,
    };
  }

 
  async update(
    id: number, 
    updateMobileCampaignDto: UpdateMobileCampaignDto,
  ): Promise<ReadMobileCampaignDto> { 
    const entityToUpdate = await this.mobileCampaignRepository.findOne({
      where: { campaignsId: id }, 
    });

    if (!entityToUpdate) {
      throw new HttpException(
        `Campaña con ID ${id} no encontrada para actualizar.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const mergedEntity = MobileCampaignMapper.updateDtoToEntity(
      updateMobileCampaignDto,
      entityToUpdate, 
    );

    const updatedCampaign = await this.mobileCampaignRepository.save(mergedEntity);

    return MobileCampaignMapper.entityToReadDto(updatedCampaign);
  }

  async updateCampaignImageUrl(campaignId: number, imageUrl: string): Promise<ReadMobileCampaignDto> {
    const campaign = await this.mobileCampaignRepository.findOne({
      where: { campaignsId: campaignId },
    });

    if (!campaign) {
      throw new HttpException(`Campaña con ID ${campaignId} no encontrada.`, HttpStatus.NOT_FOUND);
    }

    campaign.imageUrl = imageUrl; 
    const updatedCampaign = await this.mobileCampaignRepository.save(campaign); 

    return MobileCampaignMapper.entityToReadDto(updatedCampaign);
  }
}