import {ReadPersonDto} from "@/person/dto/readPerson.dto";

export class ReadPersonAddressDto {
    pkAddress: number;
    phone: string;
    isPrimary: number;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    person : ReadPersonDto;
}
