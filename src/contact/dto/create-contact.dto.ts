import { OmitType } from '@nestjs/mapped-types';
import { ContactEntity } from '../entities/contact.entity';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto extends OmitType(ContactEntity, [
    'pkContact', 'status', 'createdAt', 'updatedAt', 'person',
]) {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    fkPerson: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    entry: number;

    @ApiProperty()
    @IsNumber()
    isCommercial : number;
}
