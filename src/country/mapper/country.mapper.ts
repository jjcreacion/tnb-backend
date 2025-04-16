import { CountryEntity } from '../entities/country.entity';
import { ReadCountryDto } from '../dto/readCountry.dto';
import { CreateCountryDto } from '../dto/createCountry.dto';
import { UpdateCountryDto } from '../dto/updateCountry.dto';

export class CountryMapper {
    static entityToReadCountryDto(entity: CountryEntity): ReadCountryDto {
        const responseDto = new ReadCountryDto();
        responseDto.pkCountry = entity.pkCountry;
        responseDto.name = entity.name;
        responseDto.status = entity.status;
        responseDto.createdAt = entity.createdAt;
        responseDto.updatedAt = entity.updatedAt;
        return responseDto;
    }

    static readCountryDtoToEntity(dto: ReadCountryDto): CountryEntity {
        const entity = new CountryEntity();
        entity.pkCountry = dto.pkCountry;
        entity.name = dto.name;
        entity.status = dto.status;
        entity.createdAt = dto.createdAt;
        entity.updatedAt = dto.updatedAt;
        return entity;
    }

    static createCountryDtoToEntity(dto: CreateCountryDto): CountryEntity {
        const entity = new CountryEntity();
        entity.name = dto.name;
        return entity;
    }

    static updateCountryDtoToEntity(dto: UpdateCountryDto): CountryEntity {
        const entity = new CountryEntity();
        entity.pkCountry = dto.pkCountry;
        entity.name = dto.name;
        entity.status = dto.status;
        return entity;
    }
}