import { IsString, IsNotEmpty, IsDate, IsNumber, IsOptional } from 'class-validator';
import { OmitType, ApiProperty } from "@nestjs/swagger";
import { PersonEntity } from "@/person/entities/person.entity";


export class CreatePersonDto extends OmitType(PersonEntity,
    ['pkPerson','status','createdAt','updatedAt']
){
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
    @IsOptional()
    status: number;

}
