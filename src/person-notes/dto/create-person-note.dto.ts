import { OmitType } from "@nestjs/swagger";
import { PersonNoteEntity } from "../entities/person-note.entity";
import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePersonNoteDto extends OmitType(PersonNoteEntity, [
    "pkNote", "createdAt", "updatedAt", "contact", "user"
] as const) {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    note: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    isPriority: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    fkContact: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    fkUser: number;
}