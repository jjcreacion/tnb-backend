import { PersonEntity } from "@/person/entities/person.entity";
import { ApiProperty, OmitType } from "@nestjs/swagger";
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';


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
    @Type(() => Date)
    @IsDate({ message: 'The date of birth must be a valid Date' })
    @IsOptional()
    dateOfBirth: Date;
    
    @ApiProperty()
    @ApiProperty()
    @IsString({ message: 'The last name is required' })
    @IsNotEmpty({ message: 'The last name cannot be empty' })
    lastName: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    status: number;

}
