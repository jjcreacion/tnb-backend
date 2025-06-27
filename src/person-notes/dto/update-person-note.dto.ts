import { OmitType } from "@nestjs/swagger";
import { PersonNoteEntity } from "../entities/person-note.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsNumber, IsString } from "class-validator";

export class UpdatePersonNoteDto extends OmitType(PersonNoteEntity, ['createdAt', 'updatedAt'] ) {
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    pkNote: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    note: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    isPriority: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    fkContact: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    fkUser: number;
}