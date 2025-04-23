import {OmitType, PartialType} from "@nestjs/swagger";
import {SubCategoryEntity} from "@/sub-category/entity/subCategory.entity";
import {ReadCategoryDto} from "@/category/dto/read-category.dto";
import {ReadServicesDto} from "@/services/dto/read-services.dto";

export class ReadSubCategoryDto extends OmitType(SubCategoryEntity,
    ['status','updatedAt','createdAt','category','services']) {

    pkSubCategory: number;
    name: string;
    description: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    fkCategory: number;
    category : ReadCategoryDto ;
    services : ReadServicesDto | ReadServicesDto[];
}