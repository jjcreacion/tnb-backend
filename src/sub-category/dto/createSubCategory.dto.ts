import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import {ApiProperty, OmitType} from "@nestjs/swagger";
import {SubCategoryEntity} from "@/sub-category/entity/subCategory.entity";


export class CreateSubCategoryDto extends OmitType(SubCategoryEntity,
['status','updatedAt','createdAt',]) {

    @IsNumber({}, { message: 'Category ID must be a number' })
    @IsNotEmpty({ message: 'Category ID is required' })
    @ApiProperty()
    fkCategory: number;

    @IsString({ message: 'Name is required' })
    @IsNotEmpty({ message: 'Name cannot be empty' })
    @ApiProperty()
    name: string;

    @IsString({ message: 'Description must be a string' })
    @IsOptional()
    @ApiProperty()
    description: string;

}
