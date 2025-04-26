import {ReadServicesDto} from "@/services/dto/read-services.dto";

export class ReadAddonsDto {
    pkAddon: number;
    isReail: number;
    name: string;
    description: string;
    contentWeb: string;
    price: number;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    fkService: number;
    service : ReadServicesDto;
}