import { RequestEntity } from '../entities/service-request.entity';
import { CategoryEntity } from '@/category/entities/category.entity';
import { SubCategoryEntity } from '@/sub-category/entity/sub-category.entity';
import { CreateRequestDto } from '../dto/create-request.dto';
import { ReadRequestDto } from '../dto/read-request.dto';
import { UpdateRequestDto } from '../dto/update-request.dt';
import { UserEntity } from '@/user/entities/user.entity';

export class RequestMapper {
  static createRequestDtoToEntity(dto: CreateRequestDto): RequestEntity {
    const entity = new RequestEntity();
    entity.fkUser = { pkUser: dto.fkUser } as UserEntity;
    entity.fkCategory = { pkCategory: dto.fkCategory } as CategoryEntity;
    entity.fkSubCategory = { pkSubCategory: dto.fkSubCategory } as SubCategoryEntity;
    entity.serviceDescription = dto.serviceDescription;
    entity.address = dto.address;
    entity.latitude = dto.latitude;
    entity.longitude = dto.longitude;
    entity.status = dto.status;
    return entity;
  }

  static entityToReadRequestDto(entity: RequestEntity): ReadRequestDto {
    const dto = new ReadRequestDto();
    dto.requestId = entity.requestId;
    dto.fkCategory = { pkCategory: dto.fkCategory } as any;
    dto.fkSubCategory = { pkSubCategory: dto.fkSubCategory } as any;
    dto.serviceDescription = entity.serviceDescription;
    dto.address = entity.address;
    dto.latitude = entity.latitude;
    dto.longitude = entity.longitude;
    dto.status = entity.status;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    dto.fkUser = entity.fkUser;
    return dto;
  }

  static updateRequestDtoToEntity(dto: UpdateRequestDto): RequestEntity {
    const entity = new RequestEntity();
    entity.requestId = dto.requestId;
    if (dto.fkUser) {
      entity.fkUser = { user_id: dto.fkUser } as any;
    }
    entity.fkCategory = { pkCategory: dto.fkCategory } as any;
    entity.fkSubCategory = { pkSubCategory: dto.fkSubCategory } as any;
    entity.serviceDescription = dto.serviceDescription;
    entity.address = dto.address;
    entity.latitude = dto.latitude;
    entity.longitude = dto.longitude;
    entity.status = dto.status;
    return entity;
  }
}
