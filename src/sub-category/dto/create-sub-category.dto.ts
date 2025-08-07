import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import {ApiProperty, OmitType} from "@nestjs/swagger";
import { SubCategoryEntity } from '@/sub-category/entity/sub-category.entity';


export class CreateSubCategoryDto extends OmitType(SubCategoryEntity,
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
    @IsNotEmpty({ message: 'Fk category cannot be empty' })
    fkCategory : number;

    @IsNumber()@ApiProperty()
    @IsNotEmpty({ message: 'Fk client type cannot be empty' })
    fkClientType : number;

    @IsNumber()@ApiProperty()
    @IsNotEmpty({ message: 'Fk service type cannot be empty' })
    fkServiceType : number;

}
