import { PersonMapper } from "@/person/mapper/person.mapper";
import { ReadPersonAddressDto } from '../dto/read-person-address.dto';
import { PersonAddressEntity } from '../entities/person-address.entity';

export class PersonAddressMapper {
    static entityToReadPersonAddressDto(entity: PersonAddressEntity): ReadPersonAddressDto {
        const dto = new ReadPersonAddressDto();
        dto.pkAddress = entity.pkAddress;
        dto.address = entity.address;
        dto.addressLine2 = entity.addressLine2;
        dto.isPrimary = entity.isPrimary;
        dto.status = entity.status;
        dto.latitude = entity.latitude; 
        dto.longitude = entity.longitude;
        dto.country = entity.country;
        dto.state = entity.state;
        dto.city = entity.city;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        if(entity.person) dto.person = PersonMapper.entityToReadPersonDto(entity.person)
        return dto;
    }

    static readPersonAddressDtoToEntity(dto: ReadPersonAddressDto): PersonAddressEntity {
        const entity = new PersonAddressEntity();
        entity.pkAddress = dto.pkAddress;
        entity.address = dto.address;
        entity.addressLine2 = dto.addressLine2;
        entity.isPrimary = dto.isPrimary;
        entity.status = dto.status;
        entity.latitude = dto.latitude; 
        entity.longitude = dto.longitude;
        entity.country = dto.country;
        entity.state = dto.state;
        entity.city = dto.city;
        entity.createdAt = dto.createdAt;
        entity.updatedAt = dto.updatedAt;
        return entity;
    }
}
