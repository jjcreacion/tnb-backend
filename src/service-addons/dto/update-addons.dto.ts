import {ApiProperty, PartialType} from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional, IsBoolean } from 'class-validator';
import {AddonsEntity} from "@/service-addons/entity/addons.entity";

export class UpdateAddonsDto extends PartialType(AddonsEntity) {
    @IsNumber()@ApiProperty()
    pkAddon: number;

    @IsBoolean()@ApiProperty()
    isRetail: number;

    @IsString()@ApiProperty()
    name: string;

    @IsString()
    @IsOptional()@ApiProperty()
    description: string;

    @IsString()
    @IsOptional()@ApiProperty()
    contentWeb: string;

    @IsNumber()
    @IsOptional()@ApiProperty()
    price: number;

    @IsNumber()
    @IsOptional()@ApiProperty()
    status: number;

    @IsString()
    @IsOptional()@ApiProperty()
    createdAt: Date;

    @IsString()
    @IsOptional()@ApiProperty()
    updatedAt: Date;

    @IsNumber()
    @IsOptional()@ApiProperty()
    fkService: number;


    @IsNumber()
    @IsOptional()@ApiProperty()
    fkServiceType: number;

    @IsNumber()
    @IsOptional()@ApiProperty()
    fkClientType: number;
}