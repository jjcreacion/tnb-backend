import {ReadLocalityTypeDto} from "@/locality-type/dto/readLocalityType.dto";

export class ReadLocalityDto {
    pkLocality: number;
    name: string;
    fkState: number;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    localityType : ReadLocalityTypeDto ;
}