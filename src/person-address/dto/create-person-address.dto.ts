import { OmitType } from '@nestjs/mapped-types';
import { PersonAddressEntity } from '../entities/person-address.entity';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
