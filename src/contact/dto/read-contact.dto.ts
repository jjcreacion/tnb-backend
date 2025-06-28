import {ReadPersonDto} from "@/person/dto/readPerson.dto";
import {PersonNoteEntity} from "@/person-notes/entities/person-note.entity";

export class ReadContactDto {
    pkContact: number;
    isCommercial: number;
    entry: number;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    person : ReadPersonDto;
    notes?: PersonNoteEntity[];
}