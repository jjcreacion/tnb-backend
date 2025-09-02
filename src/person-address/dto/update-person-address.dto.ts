import { OmitType, PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PersonAddressEntity } from '../entities/person-address.entity';

export class UpdatePersonAddressDto extends PartialType(OmitType(PersonAddressEntity, ['createdAt', 'updatedAt', 'person'])) {
    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    pkAddress?: number;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    address?: string;

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
    @ApiProperty({ required: false })
    isPrimary?: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    status?: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    latitude?: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    longitude?: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    country?: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    state?: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    city?: number;
}
