
import { CategoryEntity } from '../entities/category.entity';
import {ReadCategoryDto} from "@/category/dto/readCategory.dto";
import {CreateCategoryDto} from "@/category/dto/createCategory.dto";

export class CategoryMapper {
    public entityToReadCategoryDto(entity: CategoryEntity): ReadCategoryDto {
        return {
            pkCategory: entity.pkCategory,
            name: entity.name,
            description: entity.description,
            status: entity.status,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }

    public createCategoryDtoToEntity(dto: CreateCategoryDto): CategoryEntity {
        const entity = new CategoryEntity();
        entity.name = dto.name;
        entity.description = dto.description;
        entity.status = dto.status;
        return entity;
    }

}