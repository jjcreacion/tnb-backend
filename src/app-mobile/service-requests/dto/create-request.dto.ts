import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRequestDto {
  @IsNumber({}, { message: 'User ID must be a number' })
  @IsNotEmpty({ message: 'User ID is required' })
  @ApiProperty()
  fkUser: number;

  @IsNumber({}, { message: 'User ID must be a number' })
  @IsNotEmpty({ message: 'Category is required' })
  @ApiProperty()
  fkCategory: number;

  @IsOptional()
  @ApiProperty()
  fkSubCategory: number;

  @IsOptional()
  @IsString({ message: 'Service description must be a string' })
  @ApiProperty({ required: false })
  serviceDescription: string;

  @IsString({ message: 'Address must be a string' })
  @IsNotEmpty({ message: 'Address is required' })
  @ApiProperty()
  address: string;

  @IsNumber({}, { message: 'Latitude must be a number' })
  @IsNotEmpty({ message: 'Latitude is required' })
  @ApiProperty()
  latitude: number;

  @IsNumber({}, { message: 'Longitude must be a number' })
  @IsNotEmpty({ message: 'Longitude is required' })
  @ApiProperty()
  longitude: number;

  @IsOptional()
  @IsNumber({}, { message: 'status must be a number' })
  fkRequestStatus: number;
}