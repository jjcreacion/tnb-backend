import {IsNotEmpty, IsNumber, IsPositive} from "class-validator";

export class ValidID {

    constructor( private readonly idObtained : number) { this.id = idObtained }

    @IsNumber() @IsNotEmpty() @IsPositive()
    id : number;
}