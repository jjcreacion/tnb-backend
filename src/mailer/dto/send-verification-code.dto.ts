import { IsEmail, IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class SendVerificationCodeDto {
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @Length(6, 6)
    @Matches(/^\d+$/, { message: 'Code must be a 6-digit number' })
    @ApiProperty()
    code: string;
}