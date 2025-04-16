import {ApiProperty, OmitType, PartialType} from '@nestjs/swagger';
import { CreateCategoryDto } from './createCategory.dto';
import {IsNumber, IsString, IsOptional, IsNotEmpty} from 'class-validator';
import {SubCategoryEntity} from "@/category/entities/subCategory.entity";

export class UpdateSubCategoryDto extends OmitType(SubCategoryEntity,
    ['updatedAt',"createdAt","addons",'category']
) {
  @IsNumber()
  @ApiProperty()
  pkSubCategory: number;

  @IsNumber()
  @IsNotEmpty()@ApiProperty()
  fkCategory: number;

  @IsString()
  @IsOptional()@ApiProperty()
  name: string;

  @IsString()
  @IsOptional()@ApiProperty()
  description: string;

  @IsNumber()
  @IsOptional()@ApiProperty()
  status: number;
}