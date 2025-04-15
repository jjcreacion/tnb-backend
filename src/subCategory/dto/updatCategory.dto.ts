import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './createCategory.dto';
import { IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdatCategoryDto extends PartialType(CreateCategoryDto) {
  @IsNumber()
  @IsOptional()
  pkCategory?: number;

  @IsString()
  @IsOptional()
  createdAt?: string;

  @IsString()
  @IsOptional()
  updatedAt?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  status?: number;     
}