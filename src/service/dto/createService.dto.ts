import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';


export class CreateServiceDto {

    @IsNumber({}, { message: 'Category ID must be a number' })
    @IsNotEmpty({ message: 'Category ID is required' })
    fkCategory: number;

    @IsString({ message: 'Name is required' })
    @IsNotEmpty({ message: 'Name cannot be empty' })
    name: string;

    @IsString({ message: 'Description must be a string' })
    @IsOptional()
    description: string;

    @IsNumber({}, { message: 'Status must be a number' })
    @IsOptional()
    status: number;

}
