import {SubCategoryEntity} from "@/category/entities/subCategory.entity";
import {ReadSubCategoryDto} from "@/category/dto/readSubCategory.dto";
import {CategoryEntity} from "@/category/entities/category.entity";
import {UpdateSubCategoryDto} from "@/category/dto/updateSubCategory.dto";
import {response} from "express";


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
        if(entity.category)responseDto.category = entity.category;
        if(entity.services)responseDto.services = entity.services;


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