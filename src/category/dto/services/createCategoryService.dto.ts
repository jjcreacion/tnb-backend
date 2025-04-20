import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import {ApiProperty, OmitType} from "@nestjs/swagger";
import {CategoryServicesEntity} from "@/category/entities/services/categoryServices.entity";


export class CreateCategoryServicesDto extends OmitType(CategoryServicesEntity,
    ['createdAt','updatedAt','addons',]
){


    @IsString({ message: 'Name is required' })
    @IsNotEmpty({ message: 'Name cannot be empty' })
    @ApiProperty()
    name: string;

    @IsString({ message: 'Description must be a string' })
    @IsOptional()@ApiProperty()
    description: string;

    @IsNumber()@ApiProperty()
    @IsNotEmpty({ message: 'Fk Sub category cannot be empty' })
    fkSubCategory : number;



}
