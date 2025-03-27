import {IsNotEmpty, IsString, MinLength} from "class-validator";

export class ValidPhoneDto {

    @IsString({ message: 'The phone must be a string' })
    @IsNotEmpty({ message: 'The phone is required' })
    @MinLength(6, { message: 'The phone must be at least 6 characters long' })
    phone : string;
}