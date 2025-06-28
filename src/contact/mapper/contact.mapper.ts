import { ContactEntity } from '../entities/contact.entity';
import { ReadContactDto } from '../dto/read-contact.dto';
import {PersonMapper} from "@/person/mapper/person.mapper";

export class ContactMapper {
    static entityToReadContactDto(entity: ContactEntity): ReadContactDto {
        const dto = new ReadContactDto();
        dto.pkContact = entity.pkContact;
        dto.entry = entity.entry;
        dto.isCommercial = entity.isCommercial;
        dto.status = entity.status;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        
        if(entity.person) {
            dto.person = PersonMapper.entityToReadPersonDto(entity.person);
        }
        
        if(entity.notes) {
            // Ordenar notas: prioritarias primero, luego por fecha de creación (más recientes primero)
            dto.notes = entity.notes.sort((a, b) => {
                if (a.isPriority !== b.isPriority) {
                    return b.isPriority - a.isPriority; // Prioritarias primero
                }
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            });
        }
        
        return dto;
    }

    static readContactDtoToEntity(dto: ContactEntity): ReadContactDto {
        const entity = new ReadContactDto();
        entity.pkContact = dto.pkContact;
        entity.entry = dto.entry;
        entity.isCommercial = dto.isCommercial;
        entity.status = dto.status;
        entity.createdAt = dto.createdAt;
        entity.updatedAt = dto.updatedAt;
        return entity;
    }
}