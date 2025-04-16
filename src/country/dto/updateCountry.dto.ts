import {ApiProperty, OmitType, PartialType} from '@nestjs/swagger';
import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {CountryEntity} from "@/country/entities/country.entity";

export class UpdateCountryDto extends OmitType(CountryEntity,
    ['updatedAt','createdAt']
) {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    pkCountry: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsNumber()
    @ApiProperty()
    status: number;



}