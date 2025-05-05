import { OmitType } from '@nestjs/swagger';
import { PersonPhoneEntity } from '../entities/person-phone.entity';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePersonPhoneDto extends OmitType(PersonPhoneEntity, [
    'createdAt',
    'updatedAt',
    'person'
]) {
    @IsNumber()
    @IsOptional()
    @ApiProperty()
    pkPhone: number;

    @IsString()
    @IsOptional()
    @ApiProperty()
    phone: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    isPrimary: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    status: number;

    @IsNumber()
    @ApiProperty()
    fkPerson : number;
}
