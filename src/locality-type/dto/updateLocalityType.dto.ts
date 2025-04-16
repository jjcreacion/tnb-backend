import {ApiProperty, OmitType, PartialType} from '@nestjs/swagger';
import { CreateLocalityTypeDto } from './createLocalityType.dto';
import {IsNumber, IsString, IsOptional, IsNotEmpty} from 'class-validator';
import {LocalityTypeEntity} from "@/locality-type/entities/localityType.entity";

export class UpdateLocalityTypeDto extends OmitType(LocalityTypeEntity,
    ['locality','updatedAt','createdAt']
) {
    @IsNumber()
    pkType: number;

    @IsString()
    @ApiProperty() @IsNotEmpty()
    name: string;

    @IsString()
    @ApiProperty() @IsNotEmpty()
    description: string;

    @IsNumber()
    @ApiProperty() @IsNotEmpty()
    status: number;


}