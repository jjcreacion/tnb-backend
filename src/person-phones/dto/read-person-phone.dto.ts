import { ApiProperty } from '@nestjs/swagger';
import {ReadPersonDto} from "@/person/dto/readPerson.dto";

export class ReadPersonPhoneDto {
    pkPhone: number;
    phone: string;
    isPrimary: number;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    person : ReadPersonDto;
}
