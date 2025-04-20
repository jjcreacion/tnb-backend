
import { ServicesEntity } from '../entity/services.entity';
import {SubCategoryEntity} from "@/sub-category/entity/subCategory.entity";
import {ReadServicesDto} from "@/services/dto/read-services.dto";
import {CreateServicesDto} from "@/services/dto/create-services.dto";

export class ServicesMapper {
    static entityToReadServiceDto(entity: ServicesEntity): ReadServicesDto {
        let dto = new ReadServicesDto();

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
        if(entity.clientType) dto.clientType = entity.clientType;
        if(entity.serviceType) dto.serviceType = entity.serviceType;


       return dto ;
    }

    static createServiceDtoToEntity(dto: CreateServicesDto): ServicesEntity {
        const entity = new ServicesEntity();
        entity.name = dto.name;
        entity.description = dto.description;
        return entity;
    }

    static readCategoryServicesDtoToEntity(dto: ReadServicesDto): ServicesEntity {
        const entity = new ServicesEntity();
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