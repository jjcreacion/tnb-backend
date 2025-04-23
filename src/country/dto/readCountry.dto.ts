import {ReadStateDto} from "@/country-states/dto/read-country-state.dto";

export class ReadCountryDto {
    pkCountry: number;
    name: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    states : ReadStateDto | ReadStateDto[];
}