import {IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";

export class ValidEmailDto {

    @IsString({ message: 'The email must be a string' })
    @IsNotEmpty({ message: 'The email is required' })
    @MinLength(4, { message: 'The email must be at least 4 characters long' })
    @IsEmail()
    email : string;
}