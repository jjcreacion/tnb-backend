import { CreatePersonDto } from '@/person/dto/createPerson.dto';
import { PersonEntity } from '@/person/entities/person.entity';
import { ReadPersonDto } from '@/person/dto/readPerson.dto';

export class PersonMapper {
  static entityToReadPersonDto(entity: PersonEntity): ReadPersonDto {
    const responseDto = new ReadPersonDto();
    responseDto.pkPerson = entity.pkPerson;
    responseDto.firstName = entity.firstName;
    responseDto.middleName = entity.middleName;
    responseDto.lastName = entity.lastName;
    responseDto.dateOfBirth = entity.dateOfBirth;
    responseDto.status = entity.status;
    responseDto.createdAt = entity.createdAt;
    responseDto.updatedAt = entity.updatedAt;

    if (entity.emails) {
      responseDto.emails = entity.emails;
    }
    if (entity.phones) {
      responseDto.phones = entity.phones;
    }
    if (entity.addresses) {
      responseDto.addresses = entity.addresses;
    }

    return responseDto;
  }

  static createPersonDtoToEntity(dto: CreatePersonDto): PersonEntity {
    const entity = new PersonEntity();
    entity.firstName = dto.firstName;
    entity.middleName = dto.middleName;
    entity.lastName = dto.lastName;
    entity.dateOfBirth = dto.dateOfBirth;
    entity.status = dto.status;
    return entity;
  }
}