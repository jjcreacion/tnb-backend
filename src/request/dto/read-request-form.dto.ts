import {ReadRequestDto} from "@/request/dto/readRequests.dto";
import {ReadCountryDto} from "@/country/dto/readCountry.dto";
import {ReadStateDto} from "@/country-states/dto/read-country-state.dto";
import {ReadLocalityDto} from "@/locality/dto/readLocality.dto";
import {ReadCategoryDto} from "@/category/dto/read-category.dto";


export class ReadRequestFormDto {
    request : ReadRequestDto;
    countries : ReadCountryDto | ReadCountryDto[];
    categories : ReadCategoryDto | ReadCategoryDto[];


}