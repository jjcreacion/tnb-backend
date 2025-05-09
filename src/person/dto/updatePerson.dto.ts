import { IsString, IsNotEmpty, IsDate, IsNumber, IsOptional } from 'class-validator';
import {OmitType, ApiProperty} from "@nestjs/swagger";
import {PersonEntity} from "@/person/entities/person.entity";


export class UpdatePersonDto extends OmitType(PersonEntity,
    ['dateOfBirth','createdAt','updatedAt']
){
    @ApiProperty()
    @IsNumber() @IsNotEmpty()
    pkPerson : number;

    @ApiProperty()
    @IsString({ message: 'The first name is required' })
    @IsNotEmpty({ message: 'The first name cannot be empty' })
    firstName: string;

    @ApiProperty()
    @IsString({ message: 'The middle name must be a string' })
    @IsOptional()
    middleName: string;

    @ApiProperty()
    @IsString({ message: 'The last name is required' })
    @IsNotEmpty({ message: 'The last name cannot be empty' })
    lastName: string;

    @ApiProperty()
    @IsNumber() 
    @IsNotEmpty()
    status: number;

}
