import { RequestEntity } from '../entities/campaigns.entity';
import { CreateMobileCampaignDto } from '../dto/create-campaigns.dto';
import { ReadMobileCampaignDto } from '../dto/read-campaigns.dto';
import { UpdateMobileCampaignDto } from '../dto/update-campaigns.dto';

export class MobileCampaignMapper {
  static createDtoToEntity(dto: CreateMobileCampaignDto): RequestEntity {
    const entity = new RequestEntity();
    entity.title = dto.title;
    entity.description = dto.description ?? null; 
    entity.imageUrl = dto.imageUrl;
    entity.startDate = new Date(dto.startDate);
    entity.endDate = new Date(dto.endDate);
    if (dto.isActive !== undefined) {
      entity.isActive = dto.isActive;
    }
    return entity;
  }

  static entityToReadDto(entity: RequestEntity): ReadMobileCampaignDto {
    const dto = new ReadMobileCampaignDto();
    dto.campaignsId = entity.campaignsId;
    dto.title = entity.title;
    dto.description = entity.description ?? undefined; 
    dto.imageUrl = entity.imageUrl;
    dto.startDate = entity.startDate;
    dto.endDate = entity.endDate;
    dto.isActive = entity.isActive;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }

  static updateDtoToEntity(dto: UpdateMobileCampaignDto, entity: RequestEntity): RequestEntity {
    if (dto.title !== undefined) {
      entity.title = dto.title;
    }
    if (dto.description !== undefined) {
      entity.description = dto.description ?? null; 
    }
    
    if (dto.imageUrl !== undefined) {
      entity.imageUrl = dto.imageUrl;
    }
    if (dto.startDate !== undefined) {
      entity.startDate = new Date(dto.startDate);
    }
    if (dto.endDate !== undefined) {
      entity.endDate = new Date(dto.endDate);
    }
    if (dto.isActive !== undefined) {
      entity.isActive = dto.isActive;
    }
    return entity;
  }
}