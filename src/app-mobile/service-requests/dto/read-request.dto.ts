import {ReadUserDto} from "@/user/dto/readUser.dto";
import { ReadCategoryDto } from "@/category/dto/read-category.dto";
import { ReadSubCategoryDto } from "@/sub-category/dto/read-sub-category.dto";

export class ReadRequestDto {
    requestId: number;
    serviceDescription: string;
    fkCategory: ReadCategoryDto;
    fkSubCategory?: ReadSubCategoryDto; 
    address: string;
    latitude: number;
    longitude: number;
    fkRequestStatus: number;
    createdAt: Date;
    updatedAt: Date;
    fkUser?: ReadUserDto | ReadUserDto[];
}