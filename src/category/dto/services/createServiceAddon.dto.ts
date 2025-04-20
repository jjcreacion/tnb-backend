import { IsString, IsNotEmpty, IsNumber, IsOptional, IsBoolean } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateServiceAddonDto {
    @IsBoolean()
    @IsOptional()@ApiProperty()
    isRetail: number;

    @IsString({ message: 'Name is required' })
    @IsNotEmpty({ message: 'Name cannot be empty' })@ApiProperty()
    name: string;

    @IsString({ message: 'Description must be a string' })
    @IsOptional()@ApiProperty()
    description: string;

    @IsString({ message: 'Content Web must be a string' })
    @IsOptional()@ApiProperty()
    contentWeb: string;

    @IsNumber({}, { message: 'Price must be a number' })
    @IsOptional()@ApiProperty()
    price: number;

    @IsNumber({}, { message: 'Service ID must be a number' })
    @IsNotEmpty({ message: 'Service ID is required' })@ApiProperty()
    fkService: number;

    @IsNumber({}, { message: 'SubCategory ID must be a number' })
    @IsNotEmpty({ message: 'SubCategory ID is required' })@ApiProperty()
    fkSubCategory: number;

    @IsNumber({}, { message: 'Service Type ID must be a number' })
    @IsNotEmpty({ message: 'Service Type ID is required' })@ApiProperty()
    fkServiceType: number;

    @IsNumber({}, { message: 'Client Type ID must be a number' })
    @IsNotEmpty({ message: 'Client Type ID is required' })@ApiProperty()
    fkClientType: number;
}