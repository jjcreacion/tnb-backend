import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsNumber()
  @IsOptional()
  pkCategory: number;

  @IsString({ message: 'Name is required' })
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @IsString()
  @IsOptional()
  createdAt: string;

  @IsString()
  @IsOptional()
  updatedAt: string;
}