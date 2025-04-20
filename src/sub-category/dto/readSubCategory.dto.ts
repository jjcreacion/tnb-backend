import {CategoryEntity} from "@/category/entities/category.entity";
import {ServicesEntity} from "@/services/entity/services.entity";
import {OmitType, PartialType} from "@nestjs/swagger";
import {SubCategoryEntity} from "@/sub-category/entity/subCategory.entity";

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
    services : ServicesEntity | ServicesEntity[];
}