import { OmitType } from "@nestjs/swagger";
import { PersonEmailEntity } from "../entities/person-email.entity";
import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePersonEmailDto extends OmitType(PersonEmailEntity, [
    "pkEmail", "status", "createdAt", "updatedAt"
] as const) {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    isPrimary: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    fkPerson: number;
}
