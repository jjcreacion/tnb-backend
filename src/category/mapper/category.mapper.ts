import { CategoryEntity } from '../entities/category.entity';
import {ReadCategoryDto} from "@/category/dto/read-category.dto";
import {SubCategoryMapper} from "@/sub-category/mapper/subCategory.mapper";

export class CategoryMapper {
    static entityToReadCategoryDto(entity: CategoryEntity): ReadCategoryDto {
        console.log('Category recivied and mapped: ')
        console.log(entity)
        console.log()
        console.log()
        let responseDto = new ReadCategoryDto();
        responseDto.pkCategory = entity.pkCategory;
        responseDto.name = entity.name;
        responseDto.description = entity.description;
        responseDto.status = entity.status;
        responseDto.createdAt = entity.createdAt;
        responseDto.updatedAt = entity.updatedAt;

        if(entity.subCategory){
            if(Array.isArray(entity.subCategory)){

                responseDto.subCategory= entity.subCategory.map( (sub)=>
                     SubCategoryMapper.entityToReadSubCategoryDto(sub)
                )
            }else{
                responseDto.subCategory=SubCategoryMapper.entityToReadSubCategoryDto(entity.subCategory);
            }
        }
        
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