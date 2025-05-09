import {ReadPersonDto} from "@/person/dto/readPerson.dto";

export class ReadContactDto {
    pkContact: number;
    isCommercial: number;
    entry: number;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    person : ReadPersonDto;
}
