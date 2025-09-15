import { RequestImageEntity } from './entities/request-image.entity';
import { ReadRequestImageDto } from './dto/read-request-image.dto';

export class RequestImageMapper {
  public static toDto(entity: RequestImageEntity): ReadRequestImageDto {
    const dto = new ReadRequestImageDto();
    dto.imageId = entity.imageId;
    dto.fkRequestId = entity.fkRequestId;
    dto.urlImage = entity.urlImage;
    dto.createdAt = entity.createdAt;
    return dto;
  }

  public static toDtoList(entities: RequestImageEntity[]): ReadRequestImageDto[] {
    return entities.map(entity => this.toDto(entity));
  }
}

