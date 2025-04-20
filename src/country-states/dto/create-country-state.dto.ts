import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import {ApiProperty, OmitType} from "@nestjs/swagger";
import {CountryStateEntity} from "@/country-states/entities/country-states.entity";

export class CreateStateDto extends OmitType(CountryStateEntity,
    ['createdAt','updatedAt','country']
) {
    @IsString({ message: 'Name is required' })
    @IsNotEmpty({ message: 'Name cannot be empty' })
    @ApiProperty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    internalCode: string;

    @IsNumber({}, { message: 'Country ID must be a number' })
    @IsNotEmpty({ message: 'Country ID is required' })
    @ApiProperty()
    fkCountry: number;


}