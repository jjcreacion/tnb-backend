import {ServicesTypeEntity} from "@/services-type/entity/services-type.entity";
import {ReadServicesTypeDto} from "@/services-type/dto/read-services-type.dto";
import {CreateServicesTypeDto} from "@/services-type/dto/create-services-type.dto";
import {UpdateServicesTypeDto} from "@/services-type/dto/update-services-type.dto";

export class ServicesTypeMapper {
    static entityToReadServicesTypeDto(entity: ServicesTypeEntity): ReadServicesTypeDto {
        const responseDto = new ReadServicesTypeDto();
        responseDto.pkType = entity.pkType;
        responseDto.name = entity.name;
        responseDto.description = entity.description;
        responseDto.status = entity.status;
        responseDto.createdAt = entity.createdAt;
        responseDto.updatedAt = entity.updatedAt;
        return responseDto;
    }

    static readServicesTypeDtoToEntity(dto: ReadServicesTypeDto): ServicesTypeEntity {
        const entity = new ServicesTypeEntity();
        entity.pkType = dto.pkType;
        entity.name = dto.name;
        entity.description = dto.description;
        entity.status = dto.status;
        entity.createdAt = dto.createdAt;
        entity.updatedAt = dto.updatedAt;
        return entity;
    }

    static createServicesTypeDtoToEntity(dto: CreateServicesTypeDto): ServicesTypeEntity {
        const entity = new ServicesTypeEntity();
        entity.name = dto.name;
        entity.description = dto.description;
        return entity;
    }

    static updateServicesTypeDtoToEntity(dto: UpdateServicesTypeDto): ServicesTypeEntity {
        const entity = new ServicesTypeEntity();
        entity.pkType = dto.pkType;
        entity.name = dto.name;
        entity.description = dto.description;
        entity.status = dto.status;
        entity.createdAt = dto.createdAt as Date;
        entity.updatedAt = dto.updatedAt as Date;
        return entity;
    }
}