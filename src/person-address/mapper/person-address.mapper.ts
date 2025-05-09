import { PersonAddressEntity } from '../entities/person-address.entity';
import { ReadPersonAddressDto } from '../dto/read-person-address.dto';
import {PersonMapper} from "@/person/mapper/person.mapper";

export class PersonAddressMapper {
    static entityToReadPersonAddressDto(entity: PersonAddressEntity): ReadPersonAddressDto {
        const dto = new ReadPersonAddressDto();
        dto.pkAddress = entity.pkAddress;
        dto.address = entity.address;
        dto.isPrimary = entity.isPrimary;
        dto.status = entity.status;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        if(entity.person) dto.person = PersonMapper.entityToReadPersonDto(entity.person)
        return dto;
    }

    static readPersonAddressDtoToEntity(dto: ReadPersonAddressDto): PersonAddressEntity {
        const entity = new PersonAddressEntity();
        entity.pkAddress = dto.pkAddress;
        entity.address = dto.address;
        entity.isPrimary = dto.isPrimary;
        entity.status = dto.status;
        entity.createdAt = dto.createdAt;
        entity.updatedAt = dto.updatedAt;
        return entity;
    }
}
