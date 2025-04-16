import {ReadServicesTypeDto} from "@/category/dto/services/readServicesType.dto";
import {ServicesTypeEntity} from "@/category/entities/services/servicesType.entity";
import {CreateServicesTypeDto} from "@/category/dto/services/createServicesType.dto";
import {UpdateServicesTypeDto} from "@/category/dto/services/updateServicesType.dto";

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