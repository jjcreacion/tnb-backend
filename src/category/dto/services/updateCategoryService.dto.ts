import { PartialType } from '@nestjs/swagger';
import {CategoryServicesEntity} from "@/category/entities/services/categoryServices.entity";

export class UpdateCategoryServiceDto extends PartialType(CategoryServicesEntity) {

    pkService: number;
    name: string;
    description: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    fkCategory: number;

}
