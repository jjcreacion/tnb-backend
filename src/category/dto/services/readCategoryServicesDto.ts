import {SubCategoryEntity} from "@/category/entities/subCategory.entity";

export class ReadCategoryServicesDto {
    pkService: number;
    name: string;
    description: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    fkSubCategory: number;
    subCategory : SubCategoryEntity;
}