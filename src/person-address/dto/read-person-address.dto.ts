import { ReadPersonDto } from "@/person/dto/readPerson.dto";

export class ReadPersonAddressDto {
    pkAddress: number;
    address: string;
    addressLine2?: string;
    isPrimary: number;
    status: number;
    latitude: number;
    longitude: number;
    country: number;
    state: number;
    city: number;
    createdAt: Date;
    updatedAt: Date;
    person : ReadPersonDto;
}
