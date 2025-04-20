import { CountryEntity } from '@/country/entities/country.entity';
import {CountryStateEntity} from "@/country-states/entities/country-states.entity";
import {ReadStateDto} from "@/country-states/dto/read-country-state.dto";
import {CreateStateDto} from "@/country-states/dto/create-country-state.dto";
import {UpdateStateDto} from "@/country-states/dto/update-country-state.dto";

export class CountryStateMapper {
    static entityToReadStateDto(entity: CountryStateEntity): ReadStateDto {
        const responseDto = new ReadStateDto();
        responseDto.pkState = entity.pkState;
        responseDto.name = entity.name;
        responseDto.internalCode = entity.internalCode;
        responseDto.fkCountry = entity.country?.pkCountry;
        responseDto.status = entity.status;
        responseDto.createdAt = entity.createdAt;
        responseDto.updatedAt = entity.updatedAt;
        return responseDto;
    }

    static readStateDtoToEntity(dto: ReadStateDto): CountryStateEntity {
        const entity = new CountryStateEntity();
        entity.pkState = dto.pkState;
        entity.name = dto.name;
        entity.internalCode = dto.internalCode;
        entity.status = dto.status;
        entity.createdAt = dto.createdAt;
        entity.updatedAt = dto.updatedAt;
        if (dto.fkCountry) {
            entity.country = { pkCountry: dto.fkCountry } as CountryEntity;
        }
        return entity;
    }

    static createStateDtoToEntity(dto: CreateStateDto): CountryStateEntity {
        const entity = new CountryStateEntity();
        entity.name = dto.name;
        entity.internalCode = dto.internalCode;
        entity.country = { pkCountry: dto.fkCountry } as CountryEntity;
        return entity;
    }

    static updateStateDtoToEntity(dto: UpdateStateDto): CountryStateEntity {
        const entity = new CountryStateEntity();
        entity.pkState = dto.pkState;
        entity.name = dto.name;
        entity.status = dto.status;
        if (dto.fkCountry) {
            entity.country = { pkCountry: dto.fkCountry } as CountryEntity;
        }
        return entity;
    }
}