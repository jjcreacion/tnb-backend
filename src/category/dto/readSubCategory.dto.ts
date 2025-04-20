import {CategoryEntity} from "@/category/entities/category.entity";
import {CategoryServicesEntity} from "@/category/entities/services/categoryServices.entity";
import {OmitType, PartialType} from "@nestjs/swagger";
import {SubCategoryEntity} from "@/category/entities/subCategory.entity";

export class ReadSubCategoryDto extends OmitType(SubCategoryEntity,
    ['status','updatedAt','createdAt',]) {

    pkSubCategory: number;
    name: string;
    description: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    fkCategory: number;
    category : CategoryEntity ;
    services : CategoryServicesEntity | CategoryServicesEntity[];
}