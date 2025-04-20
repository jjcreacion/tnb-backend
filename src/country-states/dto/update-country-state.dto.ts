import {ApiProperty, OmitType, PartialType} from '@nestjs/swagger';
import {IsNumber, IsString, IsOptional, IsNotEmpty} from 'class-validator';
import {CountryStateEntity} from "@/country-states/entities/country-states.entity";

export class UpdateStateDto extends OmitType(CountryStateEntity,
    ['createdAt','updatedAt','country']
) {
    @IsNumber()
    pkState: number;

    @IsNumber()
    @IsOptional() @ApiProperty()
    fkCountry: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    internalCode: string;

    @IsNumber()
    @IsOptional() @ApiProperty()
    status: number;

}