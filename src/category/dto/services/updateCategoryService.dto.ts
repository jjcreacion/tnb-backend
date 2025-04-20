import {ApiProperty, OmitType, PartialType} from '@nestjs/swagger';
import {CategoryServicesEntity} from "@/category/entities/services/categoryServices.entity";
import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class UpdateCategoryServiceDto extends OmitType(CategoryServicesEntity,
    ['createdAt','updatedAt','addons']
) {

    @ApiProperty()
    @IsNumber()
    pkService: number;

    @ApiProperty()@IsString()@IsNotEmpty()
    name: string;

    @ApiProperty()@IsString()@IsNotEmpty()
    description: string;

    @ApiProperty()@IsNumber()
    status: number;

    @ApiProperty()@IsNumber()
    fkSubCategory: number;

}
