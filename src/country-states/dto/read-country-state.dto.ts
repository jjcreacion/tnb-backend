import {ReadLocalityDto} from "@/locality/dto/readLocality.dto";

export class ReadStateDto {
    pkState: number;
    name: string;
    fkCountry: number;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    internalCode : string;
    localities : ReadLocalityDto | ReadLocalityDto[];
}