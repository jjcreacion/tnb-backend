import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import {ApiProperty, OmitType} from "@nestjs/swagger";
import {CountryStateEntity} from "@/countryStates/entities/countryState.entity";

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