import { CategoryEntity } from '../entities/category.entity';
import {ReadCategoryDto} from "@/category/dto/readCategory.dto";
import {CreateCategoryDto} from "@/category/dto/createCategory.dto";

export class CategoryMapper {
    static entityToReadCategoryDto(entity: CategoryEntity): ReadCategoryDto {
        let responseDto = new ReadCategoryDto();
        responseDto.pkCategory = entity.pkCategory;
        responseDto.name = entity.name;
        responseDto.description = entity.description;
        responseDto.status = entity.status;
        responseDto.createdAt = entity.createdAt;
        responseDto.updatedAt = entity.updatedAt;
        
        return responseDto;
    }

    static createCategoryDtoToEntity(dto: CreateCategoryDto): CategoryEntity {
        const entity = new CategoryEntity();
        entity.name = dto.name;
        return entity;
    }

}