import { IsString, IsNotEmpty, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateServiceAddonDto {
    @IsBoolean()
    @IsOptional()
    isRetail: number;

    @IsString({ message: 'Name is required' })
    @IsNotEmpty({ message: 'Name cannot be empty' })
    name: string;

    @IsString({ message: 'Description must be a string' })
    @IsOptional()
    description: string;

    @IsString({ message: 'Content Web must be a string' })
    @IsOptional()
    contentWeb: string;

    @IsNumber({}, { message: 'Price must be a number' })
    @IsOptional()
    price: number;

    @IsNumber({}, { message: 'Service ID must be a number' })
    @IsNotEmpty({ message: 'Service ID is required' })
    fkService: number;

    @IsNumber({}, { message: 'SubCategory ID must be a number' })
    @IsNotEmpty({ message: 'SubCategory ID is required' })
    fkSubCategory: number;

    @IsNumber({}, { message: 'Service Type ID must be a number' })
    @IsNotEmpty({ message: 'Service Type ID is required' })
    fkServiceType: number;

    @IsNumber({}, { message: 'Client Type ID must be a number' })
    @IsNotEmpty({ message: 'Client Type ID is required' })
    fkClientType: number;
}