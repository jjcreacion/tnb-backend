import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PersonAddressEntity } from '../entities/person-address.entity';

export class UpdatePersonAddressDto extends OmitType(PersonAddressEntity, ['createdAt', 'updatedAt']) {
    @IsNumber()
    @IsOptional()
    @ApiProperty()
    pkAddress: number;

    @IsString()
    @IsOptional()
    @ApiProperty()
    address: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    addressLine2?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    zipCode?: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    isPrimary: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    status: number;

    fkPerson : number;
}
