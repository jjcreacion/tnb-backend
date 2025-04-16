
import { CategoryServicesEntity } from '../../entities/services/categoryServices.entity';
import {ReadCategoryServicesDto} from "@/category/dto/services/readCategoryServicesDto";
import {CreateCategoryServicesDto} from "@/category/dto/services/createCategoryService.dto";
import {CategoryEntity} from "@/category/entities/category.entity";

export class CategoryServiceMapper {
    static entityToReadServiceDto(entity: CategoryServicesEntity): ReadCategoryServicesDto {
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

    static createServiceDtoToEntity(dto: CreateCategoryServicesDto): CategoryServicesEntity {
        const entity = new CategoryServicesEntity();
        entity.name = dto.name;
        entity.description = dto.description;
        entity.status = dto.status;
        return entity;
    }

    static readCategoryServicesDtoToEntity(dto: ReadCategoryServicesDto): CategoryServicesEntity {
        const entity = new CategoryServicesEntity();
        entity.pkService = dto.pkService;
        entity.name = dto.name;
        entity.description = dto.description;
        entity.status = dto.status;
        entity.createdAt = dto.createdAt;
        entity.updatedAt = dto.updatedAt;

        if (dto.fkCategory) {
            const category = new CategoryEntity();
            category.pkCategory = dto.fkCategory;
            entity.category = category;
        }

        return entity;
    }
}