import {SubCategoryEntity} from "@/sub-category/entity/subCategory.entity";
import {ServicesTypeEntity} from "@/services-type/entity/services-type.entity";
import {ClientTypeEntity} from "@/client-type/entities/clientType.entity";

export class ReadServicesDto {
    pkService: number;
    name: string;
    description: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    fkSubCategory: number;
    subCategory : SubCategoryEntity;
    serviceType : ServicesTypeEntity;
    clientType : ClientTypeEntity;
}