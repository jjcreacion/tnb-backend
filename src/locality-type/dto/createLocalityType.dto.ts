import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import {ApiProperty, OmitType} from "@nestjs/swagger";
import {LocalityTypeEntity} from "@/locality-type/entities/localityType.entity";

export class CreateLocalityTypeDto extends OmitType(LocalityTypeEntity,
    ['locality', 'status','updatedAt','createdAt']
) {
    @IsString({ message: 'Name is required' })
    @IsNotEmpty({ message: 'Name cannot be empty' })
    @ApiProperty()
    name: string;

    @IsString({ message: 'Description must be a string' })
    @ApiProperty()
    description: string;
}