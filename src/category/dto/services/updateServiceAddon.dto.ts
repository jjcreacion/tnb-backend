import { PartialType } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional, IsBoolean } from 'class-validator';
import {ServiceAddonEntity} from "@/category/entities/services/serviceAddon.entity";

export class UpdateServiceAddonDto extends PartialType(ServiceAddonEntity) {
    @IsNumber()
    pkAddon: number;

    @IsBoolean()
    isRetail: number;

    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    contentWeb: string;

    @IsNumber()
    @IsOptional()
    price: number;

    @IsNumber()
    @IsOptional()
    status: number;

    @IsString()
    @IsOptional()
    createdAt: Date;

    @IsString()
    @IsOptional()
    updatedAt: Date;

    @IsNumber()
    @IsOptional()
    fkService: number;

    @IsNumber()
    @IsOptional()
    fkSubCategory: number;

    @IsNumber()
    @IsOptional()
    fkServiceType: number;

    @IsNumber()
    @IsOptional()
    fkClientType: number;
}