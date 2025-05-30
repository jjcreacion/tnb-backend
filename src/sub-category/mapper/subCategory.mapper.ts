import {SubCategoryEntity} from "@/sub-category/entity/subCategory.entity";
import {ReadSubCategoryDto} from "@/sub-category/dto/readSubCategory.dto";
import {CategoryEntity} from "@/category/entities/category.entity";
import {UpdateSubCategoryDto} from "@/sub-category/dto/updateSubCategory.dto";
import {response} from "express";
import {CategoryMapper} from "@/category/mapper/category.mapper";
import {ServicesMapper} from "@/services/mapper/services.mapper";


export class SubCategoryMapper{
    static entityToReadSubCategoryDto(entity: SubCategoryEntity): ReadSubCategoryDto {
        let responseDto = new ReadSubCategoryDto();
        responseDto.pkSubCategory = entity.pkSubCategory;
        responseDto.name = entity.name;
        responseDto.description = entity.description;
        responseDto.status = entity.status;
        responseDto.createdAt = entity.createdAt;
        responseDto.updatedAt = entity.updatedAt;
        if(entity.category)responseDto.fkCategory = entity.category.pkCategory;
        if(entity.category)responseDto.category = CategoryMapper.entityToReadCategoryDto(entity.category);

        if(entity.services){
            if(Array.isArray(entity.services) ){
                responseDto.services = entity.services.map( (service) =>
                    ServicesMapper.entityToReadServiceDto(service)
                );
            }else{
                responseDto.services = ServicesMapper.entityToReadServiceDto(entity.services);
            }
        }





        return responseDto;
    }
    static readSubCategoryDtoToEntity(dto: ReadSubCategoryDto ): SubCategoryEntity {
        const entity = new SubCategoryEntity();
        entity.pkSubCategory = dto.pkSubCategory;
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