import {AddonsEntity} from "@/service-addons/entity/addons.entity";
import {UpdateAddonsDto} from "@/service-addons/dto/update-addons.dto";
import {ReadAddonsDto} from "@/service-addons/dto/read-addons.dto";
import {CreateAddonsDto} from "@/service-addons/dto/create-addons.dto";

import { SubCategoryMapper } from "@/sub-category/mapper/sub-category.mapper";
import { SubCategoryEntity } from "@/sub-category/entity/sub-category.entity";

export class ServiceAddonMapper {
    static entityToReadServiceAddonDto(entity: AddonsEntity): ReadAddonsDto {
        const responseDto = new ReadAddonsDto();
        responseDto.pkAddon = entity.pkAddon;
        responseDto.isReail = entity.isRetail;
        responseDto.name = entity.name;
        responseDto.description = entity.description;
        responseDto.contentWeb = entity.contentWeb;
        responseDto.price = entity.price;
        responseDto.status = entity.status;
        responseDto.createdAt = entity.createdAt;
        responseDto.updatedAt = entity.updatedAt;
        if(entity.subCategory){
            responseDto.fkService = entity.subCategory.pkSubCategory;
            responseDto.subCategory=SubCategoryMapper.entityToReadServiceDto(entity.subCategory)
        }
        return responseDto;
    }

    static readServiceAddonDtoToEntity(dto: ReadAddonsDto): AddonsEntity {
        const entity = new AddonsEntity();
        entity.pkAddon = dto.pkAddon;
        entity.isRetail = dto.isReail;
        entity.name = dto.name;
        entity.description = dto.description;
        entity.contentWeb = dto.contentWeb;
        entity.price = dto.price;
        entity.status = dto.status;
        entity.createdAt = dto.createdAt;
        entity.updatedAt = dto.updatedAt;

        if (dto.fkService) {
            entity.subCategory = { pkSubCategory: dto.fkService } as SubCategoryEntity;
        }


        return entity;
    }

    static createServiceAddonDtoToEntity(dto: CreateAddonsDto): AddonsEntity {
        const entity = new AddonsEntity();
        entity.isRetail = dto.isRetail;
        entity.name = dto.name;
        entity.description = dto.description;
        entity.contentWeb = dto.contentWeb;
        entity.price = dto.price;
        entity.subCategory = { pkSubCategory: dto.fkService } as SubCategoryEntity;

        return entity;
    }

    static updateServiceAddonDtoToEntity(dto: UpdateAddonsDto): AddonsEntity {
        const entity = new AddonsEntity();
        entity.pkAddon = dto.pkAddon;
        entity.isRetail = dto.isRetail;
        entity.name = dto.name;
        entity.description = dto.description;
        entity.contentWeb = dto.contentWeb;
        entity.price = dto.price;
        entity.status = dto.status;
        entity.createdAt = dto.createdAt as Date;
        entity.updatedAt = dto.updatedAt as Date;
        if (dto.fkService) {
            entity.subCategory = { pkSubCategory: dto.fkService } as SubCategoryEntity;
        }

        return entity;
    }
}