import { LocalityEntity } from '../entities/locality.entity';
import { ReadLocalityDto } from '../dto/readLocality.dto';
import { CreateLocalityDto } from '../dto/createLocality.dto';
import { UpdateLocalityDto } from '../dto/updateLocality.dto';
import {CountryStateEntity} from "@/country-states/entities/country-states.entity";

export class LocalityMapper {
    static entityToReadLocalityDto(entity: LocalityEntity): ReadLocalityDto {
        const responseDto = new ReadLocalityDto();
        responseDto.pkCity = entity.pkCity;
        responseDto.name = entity.name;
        responseDto.fkState = entity.state?.pkState;
        responseDto.status = entity.status;
        responseDto.createdAt = entity.createdAt;
        responseDto.updatedAt = entity.updatedAt;
        return responseDto;
    }

    static readLocalityDtoToEntity(dto: ReadLocalityDto): LocalityEntity {
        const entity = new LocalityEntity();
        entity.pkCity = dto.pkCity;
        entity.name = dto.name;
        entity.status = dto.status;
        entity.createdAt = dto.createdAt;
        entity.updatedAt = dto.updatedAt;
        if (dto.fkState) {
            entity.state = { pkState: dto.fkState } as CountryStateEntity;
        }
        return entity;
    }

    static createLocalityDtoToEntity(dto: CreateLocalityDto): LocalityEntity {
        const entity = new LocalityEntity();
        entity.name = dto.name;
        entity.state = { pkState: dto.fkState } as CountryStateEntity;
        return entity;
    }

    static updateLocalityDtoToEntity(dto: UpdateLocalityDto): LocalityEntity {
        const entity = new LocalityEntity();
        entity.pkCity = dto.pkCity;
        entity.name = dto.name;
        entity.status = dto.status;
        if (dto.fkState) {
            entity.state = { pkState: dto.fkState } as CountryStateEntity;
        }
        return entity;
    }
}