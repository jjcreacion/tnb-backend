import {SubCategoryEntity} from "@/sub-category/entity/subCategory.entity";

export class ReadServicesDto {
    pkService: number;
    name: string;
    description: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    fkSubCategory: number;
    subCategory : SubCategoryEntity;
}