import {ReadSubCategoryDto} from "@/sub-category/dto/read-sub-category.dto";

export class ReadCategoryDto {
    pkCategory: number;
    name: string;
    description: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    subCategory: ReadSubCategoryDto | ReadSubCategoryDto[];
}

