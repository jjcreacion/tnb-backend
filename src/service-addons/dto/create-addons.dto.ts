import { IsString, IsNotEmpty, IsNumber, IsOptional, IsBoolean } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateAddonsDto {
    @IsNumber()
    @IsOptional()
    @ApiProperty()
    isRetail: number;

    @IsString({ message: 'Name is required' })
    @IsNotEmpty({ message: 'Name cannot be empty' })@ApiProperty()
    name: string;

    @IsString({ message: 'Description must be a string' })
    @IsOptional()
    @ApiProperty()
    description: string;

    @IsString({ message: 'Content Web must be a string' })
    @IsOptional()
    @ApiProperty()
    contentWeb: string;

    @IsNumber({}, { message: 'Price must be a number' })
    @IsOptional()
    @ApiProperty()
    price: number;

    @IsNumber({}, { message: 'Service ID must be a number' })
    @IsNotEmpty({ message: 'Service ID is required' })
    @ApiProperty()
    fkService: number;

}