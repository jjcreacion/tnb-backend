import { OmitType } from '@nestjs/mapped-types';
import { PersonAddressEntity } from '../entities/person-address.entity';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePersonAddressDto extends OmitType(PersonAddressEntity, ['createdAt', 'updatedAt']) {
    @IsNumber()
    @IsOptional()
    @ApiProperty()
    pkAddress: number;

    @IsString()
    @IsOptional()
    @ApiProperty()
    address: string;

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
