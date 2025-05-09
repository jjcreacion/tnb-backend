import {ReadPersonDto} from "@/person/dto/readPerson.dto";

export class ReadPersonAddressDto {
    pkAddress: number;
    address: string;
    isPrimary: number;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    person : ReadPersonDto;
}
