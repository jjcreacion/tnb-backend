import {ApiProperty, OmitType, PartialType} from '@nestjs/swagger';
import {IsNumber, IsString, IsOptional, IsNotEmpty} from 'class-validator';
import {LocalityEntity} from "@/locality/entities/locality.entity";

export class UpdateLocalityDto extends OmitType(LocalityEntity,
    ['updatedAt','updatedAt','state']
) {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    pkLocality: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    fkState: number;

    @IsNumber()
    @ApiProperty()
    @IsNotEmpty()
    status: number;




}