import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateClientTypeDto {
    @IsString({ message: 'Name is required' })
    @IsNotEmpty({ message: 'Name cannot be empty' })
    name: string;

    @IsString({ message: 'Description must be a string' })
    @IsOptional()
    description: string;
}