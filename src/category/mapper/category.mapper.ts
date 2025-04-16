import { CategoryEntity } from '../entities/category.entity';
import {ReadCategoryDto} from "@/category/dto/readCategory.dto";

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
    static readCategoryDtoToEntity(dto: ReadCategoryDto): CategoryEntity {
        const entity = new CategoryEntity();
        entity.pkCategory = dto.pkCategory;
        entity.name = dto.name;
        entity.description = dto.description;
        entity.status = dto.status;
        entity.createdAt = dto.createdAt;
        entity.updatedAt = dto.updatedAt;
        return entity;
    }


}