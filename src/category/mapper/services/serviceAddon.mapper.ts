import {ServiceAddonEntity} from "@/category/entities/services/serviceAddon.entity";
import {ReadServiceAddonDto} from "@/category/dto/services/readServiceAddon.dto";
import {CategoryServicesEntity} from "@/category/entities/services/categoryServices.entity";
import {SubCategoryEntity} from "@/category/entities/subCategory.entity";
import {ServicesTypeEntity} from "@/category/entities/services/servicesType.entity";
import {ClientTypeEntity} from "@/clientType/entities/clientType.entity";
import {CreateServiceAddonDto} from "@/category/dto/services/createServiceAddon.dto";
import {UpdateServiceAddonDto} from "@/category/dto/services/updateServiceAddon.dto";

export class ServiceAddonMapper {
    static entityToReadServiceAddonDto(entity: ServiceAddonEntity): ReadServiceAddonDto {
        const responseDto = new ReadServiceAddonDto();
        responseDto.pkAddon = entity.pkAddon;
        responseDto.isReailt = entity.isRetail;
        responseDto.name = entity.name;
        responseDto.description = entity.description;
        responseDto.contentWeb = entity.contentWeb;
        responseDto.price = entity.price;
        responseDto.status = entity.status;
        responseDto.createdAt = entity.createdAt;
        responseDto.updatedAt = entity.updatedAt;
        responseDto.fkService = entity.service?.pkService;
        responseDto.fkSubCategory = entity.subCategory.pkSubCategory;
        responseDto.fkServiceType = entity.serviceType.pkType;
        responseDto.fkClientType = entity.clientType?.pkType;
        return responseDto;
    }

    static readServiceAddonDtoToEntity(dto: ReadServiceAddonDto): ServiceAddonEntity {
        const entity = new ServiceAddonEntity();
        entity.pkAddon = dto.pkAddon;
        entity.isRetail = dto.isReailt;
        entity.name = dto.name;
        entity.description = dto.description;
        entity.contentWeb = dto.contentWeb;
        entity.price = dto.price;
        entity.status = dto.status;
        entity.createdAt = dto.createdAt;
        entity.updatedAt = dto.updatedAt;

        if (dto.fkService) {
            entity.service = { pkService: dto.fkService } as CategoryServicesEntity;
        }
        if (dto.fkSubCategory) {
            entity.subCategory = { pkSubCategory: dto.fkSubCategory } as SubCategoryEntity;
        }
        if (dto.fkServiceType) {
            entity.serviceType = { pkType: dto.fkServiceType } as ServicesTypeEntity;
        }
        if (dto.fkClientType) {
            entity.clientType = { pkType: dto.fkClientType } as ClientTypeEntity;
        }
        return entity;
    }

    static createServiceAddonDtoToEntity(dto: CreateServiceAddonDto): ServiceAddonEntity {
        const entity = new ServiceAddonEntity();
        entity.isRetail = dto.isRetail;
        entity.name = dto.name;
        entity.description = dto.description;
        entity.contentWeb = dto.contentWeb;
        entity.price = dto.price;
        entity.service = { pkService: dto.fkService } as CategoryServicesEntity;
        entity.subCategory = { pkSubCategory: dto.fkSubCategory } as SubCategoryEntity;
        entity.serviceType = { pkType: dto.fkServiceType } as ServicesTypeEntity;
        entity.clientType = { pkType: dto.fkClientType } as ClientTypeEntity;
        return entity;
    }

    static updateServiceAddonDtoToEntity(dto: UpdateServiceAddonDto): ServiceAddonEntity {
        const entity = new ServiceAddonEntity();
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
            entity.service = { pkService: dto.fkService } as CategoryServicesEntity;
        }
        if (dto.fkSubCategory) {
            entity.subCategory = { pkSubCategory: dto.fkSubCategory } as SubCategoryEntity;
        }
        if (dto.fkServiceType) {
            entity.serviceType = { pkType: dto.fkServiceType } as ServicesTypeEntity;
        }
        if (dto.fkClientType) {
            entity.clientType = { pkType: dto.fkClientType } as ClientTypeEntity;
        }
        return entity;
    }
}