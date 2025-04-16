import {ApiProperty, OmitType, PartialType} from '@nestjs/swagger';
import { CreateCategoryDto } from './createCategory.dto';
import { IsNumber, IsString, IsOptional } from 'class-validator';
import {CategoryEntity} from "@/category/entities/category.entity";

export class UpdateCategoryDto extends OmitType(CategoryEntity,['updatedAt',"createdAt"]) {
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  pkCategory: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  status: number;
}