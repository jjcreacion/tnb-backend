
import { CategoryServicesEntity } from '../../entities/services/categoryServices.entity';
import {ReadCategoryServicesDto} from "@/category/dto/services/readCategoryServicesDto";
import {CreateCategoryServicesDto} from "@/category/dto/services/createCategoryService.dto";
import {SubCategoryEntity} from "@/category/entities/subCategory.entity";

export class CategoryServiceMapper {
    static entityToReadServiceDto(entity: CategoryServicesEntity): ReadCategoryServicesDto {
        let dto = new ReadCategoryServicesDto();

        dto.pkService= entity.pkService;
        dto.name= entity.name;
        dto.description= entity.description;
        dto.status= entity.status;
        dto.createdAt= entity.createdAt;
        dto.updatedAt= entity.updatedAt;
        if(entity.subCategory){
            dto.fkSubCategory= entity.subCategory.pkSubCategory;
            dto.subCategory = entity.subCategory;
        }

       return dto ;
    }

    static createServiceDtoToEntity(dto: CreateCategoryServicesDto): CategoryServicesEntity {
        const entity = new CategoryServicesEntity();
        entity.name = dto.name;
        entity.description = dto.description;
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

        if (dto.fkSubCategory) {
            const category = new SubCategoryEntity();
            category.pkSubCategory = dto.fkSubCategory;
            entity.subCategory = category;
        }

        return entity;
    }
}