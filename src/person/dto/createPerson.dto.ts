import { IsString, IsNotEmpty, IsDate, IsNumber, IsOptional } from 'class-validator';
import {OmitType} from "@nestjs/swagger";
import {PersonEntity} from "@/person/entities/person.entity";


export class CreatePersonDto extends OmitType(PersonEntity,
    ['pkPerson','status','createdAt','updatedAt']
){


    @IsString({ message: 'The first name is required' })
    @IsNotEmpty({ message: 'The first name cannot be empty' })
    firstName: string;

    @IsString({ message: 'The middle name must be a string' })
    @IsOptional()
    middleName: string;

    @IsString({ message: 'The last name is required' })
    @IsNotEmpty({ message: 'The last name cannot be empty' })
    lastName: string;

    @IsString({ message: 'The address is required' })
    @IsNotEmpty({ message: 'The address cannot be empty' })
    address: string;

    @IsDate({ message: 'The date of birth is required' })
    @IsNotEmpty({ message: 'The date of birth cannot be empty' })
    dateOfBirth: Date;

    @IsString({ message: 'The email is required' })
    @IsNotEmpty({ message: 'The email cannot be empty' })
    email: string;

    @IsString({ message: 'The phone is required' })
    @IsNotEmpty({ message: 'The phone cannot be empty' })
    phone: string;

    @IsNumber()
    @IsOptional()
    status: number;

}
