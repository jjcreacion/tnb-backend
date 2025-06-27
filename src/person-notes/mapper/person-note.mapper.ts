import { PersonNoteEntity } from "../entities/person-note.entity";
import { ReadPersonNoteDto } from "../dto/read-person-note.dto";
import { CreatePersonNoteDto } from "../dto/create-person-note.dto";

export class PersonNoteMapper {
    static entityToReadPersonNoteDto(entity: PersonNoteEntity): ReadPersonNoteDto {
        const dto = new ReadPersonNoteDto();
        dto.pkNote = entity.pkNote;
        dto.note = entity.note;
        dto.isPriority = entity.isPriority;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        
        if(entity.contact) {
            dto.contact = entity.contact;
        }
        
        if(entity.user) {
            dto.user = entity.user;
        }
        
        return dto;
    }

    static createPersonNoteDtoToEntity(dto: CreatePersonNoteDto): PersonNoteEntity {
        const entity = new PersonNoteEntity();
        entity.note = dto.note;
        entity.isPriority = dto.isPriority || 0;
        return entity;
    }

    static readDtoToEntity(dto: ReadPersonNoteDto): PersonNoteEntity {
        const entity = new PersonNoteEntity();
        entity.pkNote = dto.pkNote;
        entity.note = dto.note;
        entity.isPriority = dto.isPriority;
        entity.createdAt = dto.createdAt;
        entity.updatedAt = dto.updatedAt;
        entity.contact = dto.contact;
        entity.user = dto.user;
        return entity;
    }
}