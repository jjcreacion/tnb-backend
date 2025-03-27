import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateProfileDto {
    @IsString({ message: 'Name is required' })
    @IsNotEmpty({ message: 'Name cannot be empty' })
    name: string;

    @IsString({ message: 'Alias must be a string' })
    @IsOptional()
    alias: string;

    @IsString({ message: 'Description must be a string' })
    @IsOptional()
    description: string;

    @IsString({ message: 'Phone must be a string' })
    @IsOptional()
    phone: string;

    @IsString({ message: 'Phone extension must be a string' })
    @IsOptional()
    phoneExtension: string;

    @IsString({ message: 'Address must be a string' })
    @IsOptional()
    address: string;

    @IsNumber({}, { message: 'Zip code must be a number' })
    @IsOptional()
    zipCode: number;

    @IsString({ message: 'Industry must be a string' })
    @IsOptional()
    industry: string;

    @IsString({ message: 'Source must be a string' })
    @IsOptional()
    source: string;

    @IsString({ message: 'Profile image URL must be a string' })
    @IsOptional()
    urlProfileImage: string;

    @IsString({ message: 'Banner image URL must be a string' })
    @IsOptional()
    urlBannerImage: string;

    @IsNumber({}, { message: 'Status must be a number' })
    @IsOptional()
    status: number;
}