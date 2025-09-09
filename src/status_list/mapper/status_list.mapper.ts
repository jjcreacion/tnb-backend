import { ReadStatusListDto } from '../dto/read-status-list.dto';
import { StatusListEntity } from '../entities/status-list.entity';

export class StatusListMapper {
    static entityToReadDto(entity: StatusListEntity): ReadStatusListDto {
      const dto = new ReadStatusListDto();
      dto.statusId = entity.statusId;
      dto.order = entity.order;
      dto.name = entity.name;
      return dto;
    }

    static readDtoToEntity(dto: ReadStatusListDto): StatusListEntity {
        const entity = new StatusListEntity();
        entity.statusId = dto.statusId;
        entity.order = dto.order;
        entity.name = dto.name;
        return entity;
      }
}