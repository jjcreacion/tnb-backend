import {ReadAddonsDto} from "@/service-addons/dto/read-addons.dto";
import {ReadSubCategoryDto} from "@/sub-category/dto/readSubCategory.dto";
import {ReadServicesTypeDto} from "@/services-type/dto/read-services-type.dto";
import {ReadClientTypeDto} from "@/client-type/dto/readClientType.dto";

export class ReadServicesDto {
    pkService: number;
    name: string;
    description: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    fkSubCategory: number;
    subCategory : ReadSubCategoryDto;
    serviceType : ReadServicesTypeDto;
    clientType : ReadClientTypeDto;
    addons : ReadAddonsDto | ReadAddonsDto[];
}