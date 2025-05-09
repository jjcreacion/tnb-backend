import { OmitType } from '@nestjs/mapped-types';
import { ContactEntity } from '../entities/contact.entity';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateContactDto extends OmitType(ContactEntity, ['createdAt', 'updatedAt']) {
    @IsNumber()
    @IsOptional()
    @ApiProperty()
    pkContact: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    isCommercial: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    entry: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    status: number;

    fkPerson : number;
}
