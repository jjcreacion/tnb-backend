import { ReadLocalityTypeDto } from '../dto/readLocalityType.dto';
import { CreateLocalityTypeDto } from '../dto/createLocalityType.dto';
import { UpdateLocalityTypeDto } from '../dto/updateLocalityType.dto';
import {LocalityTypeEntity} from "@/locality-type/entities/localityType.entity";

export class LocalityTypeMapper {
    static entityToReadLocalityTypeDto(entity: LocalityTypeEntity): ReadLocalityTypeDto {
        const responseDto = new ReadLocalityTypeDto();
        responseDto.pkType = entity.pkType;
        responseDto.name = entity.name;
        responseDto.description = entity.description;
        responseDto.status = entity.status;
        responseDto.createdAt = entity.createdAt;
        responseDto.updatedAt = entity.updatedAt;
        return responseDto;
    }

    static readLocalityTypeDtoToEntity(dto: ReadLocalityTypeDto): LocalityTypeEntity {
        const entity = new LocalityTypeEntity();
        entity.pkType = dto.pkType;
        entity.name = dto.name;
        entity.description = dto.description;
        entity.status = dto.status;
        entity.createdAt = dto.createdAt;
        entity.updatedAt = dto.updatedAt;
        return entity;
    }

    static createLocalityTypeDtoToEntity(dto: CreateLocalityTypeDto): LocalityTypeEntity {
        const entity = new LocalityTypeEntity();
        entity.name = dto.name;
        entity.description = dto.description;
        return entity;
    }

    static updateLocalityTypeDtoToEntity(dto: UpdateLocalityTypeDto): LocalityTypeEntity {
        const entity = new LocalityTypeEntity();
        entity.pkType = dto.pkType;
        entity.name = dto.name;
        entity.description = dto.description;
        entity.status = dto.status;
        return entity;
    }
}