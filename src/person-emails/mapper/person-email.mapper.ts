import { PersonEmailEntity } from "../entities/person-email.entity";
import { ReadPersonEmailDto } from "../dto/read-person-email.dto";
import { PersonMapper } from "@/person/mapper/person.mapper";

export class PersonEmailMapper {
    static entityToReadPersonEmailDto(entity: PersonEmailEntity): ReadPersonEmailDto {
        const dto = new ReadPersonEmailDto();
        dto.pkEmail = entity.pkEmail;
        dto.email = entity.email;
        dto.isPrimary = entity.isPrimary;
        dto.status = entity.status;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        if(entity.person) dto.person =PersonMapper.entityToReadPersonDto(entity.person)
        return dto;
    }

    static readDtoToEntity(dto: ReadPersonEmailDto): PersonEmailEntity {
        const entity = new PersonEmailEntity();
        entity.pkEmail = dto.pkEmail;
        entity.email = dto.email;
        entity.isPrimary = dto.isPrimary;
        entity.status = dto.status;
        entity.createdAt = dto.createdAt;
        entity.updatedAt = dto.updatedAt;
        return entity;
    }
}
