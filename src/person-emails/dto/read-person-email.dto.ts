import { ApiProperty } from "@nestjs/swagger";
import {ReadPersonDto} from "@/person/dto/readPerson.dto";

export class ReadPersonEmailDto {
    pkEmail: number;
    email: string;
    isPrimary: number;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    person: ReadPersonDto;
}
