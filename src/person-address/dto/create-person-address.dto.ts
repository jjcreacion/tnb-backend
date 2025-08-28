import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { PersonAddressEntity } from '../entities/person-address.entity';

export class CreatePersonAddressDto extends OmitType(PersonAddressEntity, [
    'pkAddress', 'status', 'createdAt', 'updatedAt', 'person',
]) {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    fkPerson: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    address: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    addressLine2?: string;

    @ApiProperty()
    @IsNumber()
    isPrimary : number;

    @ApiProperty()
    @IsNumber()
    latitude: number;

    @ApiProperty()
    @IsNumber()
    longitude : number;

    @ApiProperty()
    @IsNumber()
    country : number;

    @ApiProperty()
    @IsNumber()
    state : number;

    @ApiProperty()
    @IsNumber()
    city : number;
}
