import { PersonPhoneEntity } from '../entities/person-phone.entity';
import { ReadPersonPhoneDto } from '../dto/read-person-phone.dto';
import {PersonMapper} from "@/person/mapper/person.mapper";

export class PersonPhoneMapper {
  static entityToReadPersonPhoneDto(entity: PersonPhoneEntity): ReadPersonPhoneDto {
    const dto = new ReadPersonPhoneDto();
    dto.pkPhone = entity.pkPhone;
    dto.phone = entity.phone;
    dto.isPrimary = entity.isPrimary;
    dto.status = entity.status;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    if(entity.person) dto.person = PersonMapper.entityToReadPersonDto(entity.person)
    return dto;
  }

  static readDtoToEntity(dto: ReadPersonPhoneDto): PersonPhoneEntity {
    const entity = new PersonPhoneEntity();
    entity.pkPhone = dto.pkPhone;
    entity.phone = dto.phone;
    entity.isPrimary = dto.isPrimary;
    entity.status = dto.status;
    entity.createdAt = dto.createdAt;
    entity.updatedAt = dto.updatedAt;
    return entity;
  }
}
