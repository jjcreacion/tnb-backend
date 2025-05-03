import { RequestEntity } from '../entities/service-request.entity';
import { CreateRequestDto } from '../dto/create-request.dto';
import { ReadRequestDto } from '../dto/read-request.dto';
import { UpdateRequestDto } from '../dto/update-request.dt';
import { UserEntity } from '@/user/entities/user.entity';

export class RequestMapper {
  static createRequestDtoToEntity(dto: CreateRequestDto): RequestEntity {
    const entity = new RequestEntity();
    entity.fkUser = { pkUser: dto.fkUser } as UserEntity;
    entity.serviceType = dto.serviceType;
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
    dto.serviceType = entity.serviceType;
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
    entity.serviceType = dto.serviceType;
    entity.serviceDescription = dto.serviceDescription;
    entity.address = dto.address;
    entity.latitude = dto.latitude;
    entity.longitude = dto.longitude;
    entity.status = dto.status;
    return entity;
  }
}
