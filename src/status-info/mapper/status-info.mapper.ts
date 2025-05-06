import { StatusInfoEntity } from '../entities/status-info.entity';
import { ReadStatusInfoDto } from '../dto/read-status-info.dto';

export class StatusInfoMapper {
    static entityToReadStatusInfoDto(entity: StatusInfoEntity): ReadStatusInfoDto {
        const dto = new ReadStatusInfoDto();
        dto.pkStatus = entity.pkStatus;
        dto.name = entity.name;
        dto.description = entity.description;
        dto.isEnabled = entity.isEnabled;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        return dto;
    }

    static readStatusInfoDtoToEntity(dto: ReadStatusInfoDto): StatusInfoEntity {
        const entity = new StatusInfoEntity();
        entity.pkStatus = dto.pkStatus;
        entity.name = dto.name;
        entity.description = dto.description;
        entity.isEnabled = dto.isEnabled;
        entity.createdAt = dto.createdAt;
        entity.updatedAt = dto.updatedAt;
        return entity;
    }
}
