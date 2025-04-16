import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty, OmitType} from "@nestjs/swagger";
import {CountryEntity} from "@/country/entities/country.entity";

export class CreateCountryDto  extends OmitType(CountryEntity,
    ['updatedAt','createdAt','status']
) {
    @IsString({ message: 'Name is required' })
    @IsNotEmpty({ message: 'Name cannot be empty' })
    @ApiProperty()
    name: string;
}