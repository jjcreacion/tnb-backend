import {CreatePersonDto} from "@/person/dto/createPerson.dto";
import {PersonEntity} from "@/person/entities/person.entity";
import {ReadPersonDto} from "@/person/dto/readPerson.dto";

export class PersonMapper {
    static entityToReadPersonDto(entity: PersonEntity): ReadPersonDto {

        let responseDto = new ReadPersonDto();
        responseDto.pkPerson = entity.pkPerson;
        responseDto.firstName = entity.firstName;
        responseDto.middleName = entity.middleName;
        responseDto.lastName = entity.lastName;
        responseDto.address = entity.address;
        responseDto.dateOfBirth = entity.dateOfBirth;
        responseDto.email = entity.email;
        responseDto.phone = entity.phone;
        responseDto.status = entity.status;
        responseDto.createdAt = entity.createdAt;
        responseDto.updatedAt = entity.updatedAt;
        // Omitir relaciones para evitar ciclos o cargar datos innecesarios
        // user: entity.user,
        // requests: entity.requests,

     return responseDto;
    }

    static createPersonDtoToEntity(dto: CreatePersonDto): PersonEntity {
        const entity = new PersonEntity();
        entity.firstName = dto.firstName;
        entity.middleName = dto.middleName;
        entity.lastName = dto.lastName;
        entity.address = dto.address;
        entity.dateOfBirth = dto.dateOfBirth;
        entity.email = dto.email;
        entity.phone = dto.phone;
        entity.status = dto.status;
        return entity;
    }

}