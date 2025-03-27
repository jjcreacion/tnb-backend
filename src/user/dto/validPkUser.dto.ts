import {IsNotEmpty, IsNumber, IsPositive} from "class-validator";

export class ValidPkUserDto {
    @IsNumber()
    @IsPositive({message:"the fk_person must be a positive number"})
    @IsNotEmpty({message:" the fk_person can't be a null value"})
    pkUser: number;
}