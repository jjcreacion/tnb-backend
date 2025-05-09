import {IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class ValidEmailDto {

    @ApiProperty()
    @IsEmail({}, { message: 'Invalid email format' })
    @IsNotEmpty({ message: 'The email is required' })
    email: string;

    @ApiProperty()
    @IsString({ message: 'The password must be a string' })
    @IsNotEmpty({ message: 'The password is required' })
    @MinLength(8, { message: 'The password must be at least 8 characters long' })
    password: string;
}