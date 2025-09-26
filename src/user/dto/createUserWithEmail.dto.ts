import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from '../enums/role.enum';

export class CreateUserWithEmailDto {

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty({ message: 'The person ID is required' })
    fkPerson: number;

    @ApiProperty()
    @IsEmail({}, { message: 'Invalid email format' })
    @IsNotEmpty({ message: 'The email is required' })
    email: string;

    @ApiProperty()
    @IsString({ message: 'The password must be a string' })
    @IsNotEmpty({ message: 'The password is required' })
    @MinLength(8, { message: 'The password must be at least 8 characters long' })
    password: string;

    @ApiProperty()
    @IsString({ message: 'Referred Code' })
    @IsOptional()
    referred_by_code: string;
    
    @ApiProperty({ type: [String], enum: Role, isArray: true, required: false })
    @IsOptional()
    @IsArray()
    @IsEnum(Role, { each: true })
    roles?: Role[];

    @ApiProperty({ required: false, default: 0 })
    @IsOptional()
    @IsNumber()
    validateEmail?: number;

    @ApiProperty({ required: false, default: 0 })
    @IsOptional()
    @IsNumber()
    validatePhone?: number;

    @ApiProperty({ required: false, default: 1 })
    @IsOptional()
    @IsNumber()
    status?: number;

}