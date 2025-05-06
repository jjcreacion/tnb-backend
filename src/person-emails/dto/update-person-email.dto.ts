import { OmitType } from "@nestjs/swagger";
import { PersonEmailEntity } from "../entities/person-email.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsNumber, IsEmail } from "class-validator";

export class UpdatePersonEmailDto extends OmitType(PersonEmailEntity, ['createdAt', 'updatedAt'] ) {
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    pkEmail: number;

    @ApiProperty()
    @IsEmail()
    @IsOptional()
    email: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    isPrimary: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    status: number;
}
