import {IsNotEmpty, IsString, MinLength} from "class-validator";

export class ValidUsernameDto {

    @IsString({ message: 'The username must be a string' })
    @IsNotEmpty({ message: 'The username is required' })
    @MinLength(4, { message: 'The phone must be at least 4 characters long' })
    username : string;
}