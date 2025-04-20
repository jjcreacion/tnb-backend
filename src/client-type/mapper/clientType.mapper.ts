import {ClientTypeEntity} from "@/client-type/entities/clientType.entity";
import {ReadClientTypeDto} from "@/client-type/dto/readClientType.dto";
import {CreateClientTypeDto} from "@/client-type/dto/createClientType.dto";
import {UpdateClientTypeDto} from "@/client-type/dto/updateClientType";

export class ClientTypeMapper {
    static entityToReadClientTypeDto(entity: ClientTypeEntity): ReadClientTypeDto {
        const responseDto = new ReadClientTypeDto();
        responseDto.pkType = entity.pkType;
        responseDto.name = entity.name;
        responseDto.description = entity.description;
        responseDto.status = entity.status;
        responseDto.createdAt = entity.createdAt;
        responseDto.updatedAt = entity.updatedAt;
        return responseDto;
    }

    static readClientTypeDtoToEntity(dto: ReadClientTypeDto): ClientTypeEntity {
        const entity = new ClientTypeEntity();
        entity.pkType = dto.pkType;
        entity.name = dto.name;
        entity.description = dto.description;
        entity.status = dto.status;
        entity.createdAt = dto.createdAt;
        entity.updatedAt = dto.updatedAt;
        return entity;
    }

    static createClientTypeDtoToEntity(dto: CreateClientTypeDto): ClientTypeEntity {
        const entity = new ClientTypeEntity();
        entity.name = dto.name;
        entity.description = dto.description;
        return entity;
    }

    static updateClientTypeDtoToEntity(dto: UpdateClientTypeDto): ClientTypeEntity {
        const entity = new ClientTypeEntity();
        entity.pkType = dto.pkType;
        entity.name = dto.name;
        entity.description = dto.description;
        entity.status = dto.status;
        entity.createdAt = dto.createdAt as Date;
        entity.updatedAt = dto.updatedAt as Date;
        return entity;
    }
}