import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsPositive, MinLength} from "class-validator";


export class FindRequestsByPersonDto {
    @ApiProperty({ description: 'Valor del parámetro', example: 'G-20xxxx' })
    @IsNotEmpty() @IsNumber() @IsPositive()
    fkPerson : number;
}