import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateRequestDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  requestId: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  fkUser: number; 

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  fkCategory: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  fkSubCategory: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  serviceDescription: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  address: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  latitude: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  longitude: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  fkRequestStatus: number;
}
