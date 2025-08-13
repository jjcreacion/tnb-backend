import { ReadAddonsDto } from "@/service-addons/dto/read-addons.dto";
import { ReadCategoryDto } from "@/category/dto/read-category.dto";
import { ReadServicesTypeDto } from "@/services-type/dto/read-services-type.dto";
import { ReadClientTypeDto } from "@/client-type/dto/readClientType.dto";
import { SubCategoryEntity } from '@/sub-category/entity/sub-category.entity';
import { OmitType } from "@nestjs/swagger";

export class ReadSubCategoryDto extends OmitType(SubCategoryEntity,
    ['category','serviceType','clientType','addons']
) {
    pkSubCategory: number;
    name: string;
    description: string;
    priceFrom: number;
    priceTo: number;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    fkCategory: number;
    category : ReadCategoryDto;
    serviceType : ReadServicesTypeDto;
    clientType : ReadClientTypeDto;
    addons : ReadAddonsDto | ReadAddonsDto[];
}