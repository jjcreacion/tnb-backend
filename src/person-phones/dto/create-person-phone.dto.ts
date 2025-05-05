import { OmitType } from '@nestjs/swagger';
import { PersonPhoneEntity } from '../entities/person-phone.entity';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePersonPhoneDto extends OmitType(PersonPhoneEntity, [
    'pkPhone',
    'status',
    'createdAt',
    'updatedAt',
    'person'
]) {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    fkPerson: number;

    @IsString({ message: 'Phone is required' })
    @IsNotEmpty({ message: 'Phone cannot be empty' })
    @ApiProperty()
    phone: string;

    @ApiProperty()
    @IsNumber()
    isPrimary : number;
}
