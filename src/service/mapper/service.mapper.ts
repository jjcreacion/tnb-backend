
import { ServiceEntity } from '../entities/service.entity';
import {CreateServiceDto} from "@/service/dto/createService.dto";
import {ReadServiceDto} from "@/service/dto/readService.dto";

export class ServiceMapper {
    public entityToReadServiceDto(entity: ServiceEntity): ReadServiceDto {
        return {
            pkService: entity.pkService,
            name: entity.name,
            description: entity.description,
            status: entity.status,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            fkCategory: entity.category.pkCategory,
        };
    }

    public createServiceDtoToEntity(dto: CreateServiceDto): ServiceEntity {
        const entity = new ServiceEntity();
        entity.name = dto.name;
        entity.description = dto.description;
        entity.status = dto.status;
        return entity;
    }

}