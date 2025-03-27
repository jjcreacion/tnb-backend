import { IsString, IsNotEmpty, IsEmail, MinLength, IsNumber, IsOptional } from 'class-validator';

export class CreateUserDto {

    @IsNumber()
    @IsNotEmpty({ message: 'The person ID is required' })
    fkPerson: number;

    @IsNumber()
    @IsNotEmpty({ message: 'The profile ID is required' })
    profileId: number;

    @IsEmail({}, { message: 'Invalid email format' })
    @IsNotEmpty({ message: 'The email is required' })
    email: string;

    @IsString({ message: 'The username must be a string' })
    @IsNotEmpty({ message: 'The username is required' })
    username: string;

    @IsString({ message: 'The password must be a string' })
    @IsNotEmpty({ message: 'The password is required' })
    @MinLength(8, { message: 'The password must be at least 8 characters long' })
    password: string;

    @IsString({ message: 'The phone must be a string' })
    @IsNotEmpty({ message: 'The phone is required' })
    phone: string;

    @IsNumber()
    @IsOptional()
    validateEmail: number;

    @IsNumber()
    @IsOptional()
    validatePhone: number;

    @IsNumber()
    @IsOptional()
    status: number;
}