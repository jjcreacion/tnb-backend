
import { SubCategoryEntity } from '../entity/sub-category.entity';
import {CategoryEntity} from "@/category/entities/category.entity";
import {ReadSubCategoryDto} from "@/sub-category/dto/read-sub-category.dto";
import {CreateSubCategoryDto} from "@/sub-category/dto/create-sub-category.dto";
import {CategoryMapper} from "@/category/mapper/category.mapper";
import {ServiceAddonMapper} from "@/service-addons/mapper/serviceAddon.mapper";

export class SubCategoryMapper {
    static entityToReadServiceDto(entity: SubCategoryEntity): ReadSubCategoryDto {
        let dto = new ReadSubCategoryDto();

            dto.pkSubCategory= entity.pkSubCategory;
            dto.name= entity.name;
            dto.description= entity.description;
            dto.status= entity.status;
            dto.createdAt= entity.createdAt;
            dto.updatedAt= entity.updatedAt;
            if(entity.category){
                dto.fkCategory= entity.category.pkCategory;
                dto.category = CategoryMapper.entityToReadCategoryDto(entity.category);
            }
            if(entity.clientType) dto.clientType = entity.clientType;
            if(entity.serviceType) dto.serviceType = entity.serviceType;

        if(entity.addons) {
            if (Array.isArray(entity.addons)) {
                dto.addons = entity.addons.map((addon) =>
                    ServiceAddonMapper.entityToReadServiceAddonDto(addon)
                )
            }else{
                dto.addons = ServiceAddonMapper.entityToReadServiceAddonDto(entity.addons)
            }
        }

       return dto ;
    }

    static createServiceDtoToEntity(dto: CreateSubCategoryDto): SubCategoryEntity {
        const entity = new SubCategoryEntity();
        entity.name = dto.name;
        entity.description = dto.description;
        return entity;
    }

    static readCategoryServicesDtoToEntity(dto: ReadSubCategoryDto): SubCategoryEntity {
        const entity = new SubCategoryEntity();
        entity.pkSubCategory = dto.pkSubCategory;
        entity.name = dto.name;
        entity.description = dto.description;
        entity.status = dto.status;
        entity.createdAt = dto.createdAt;
        entity.updatedAt = dto.updatedAt;

        /*if (dto.fkCategory) {
            const subCategory = new SubCategoryEntity();
            subCategory.pkSubCategory= dto.fkCategory;
            entity.category = subCategory;
        }*/

        return entity;
    }
}