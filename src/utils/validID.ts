import {IsNotEmpty, IsNumber, IsPositive} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class ValidID {

    constructor( private readonly idObtained : number) { this.id = idObtained }

    @IsNumber() @IsNotEmpty() @IsPositive() @ApiProperty()
    id : number;
}