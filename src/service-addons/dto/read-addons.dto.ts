import { ReadSubCategoryDto } from "@/sub-category/dto/read-sub-category.dto";

export class ReadAddonsDto {
    pkAddon: number;
    isRetail: number;
    name: string;
    description: string;
    contentWeb: string;
    price: number;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    fkService: number;
    subCategory : ReadSubCategoryDto;
}