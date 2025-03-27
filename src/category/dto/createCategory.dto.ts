import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateCategoryDto {

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
