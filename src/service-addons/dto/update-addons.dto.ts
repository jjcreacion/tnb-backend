import {ApiProperty, PartialType} from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional, IsBoolean } from 'class-validator';
import {AddonsEntity} from "@/service-addons/entity/addons.entity";

export class UpdateAddonsDto extends PartialType(AddonsEntity) {
    @IsNumber()
    @ApiProperty()
    pkAddon: number;

    @IsNumber()
    @ApiProperty()
    isRetail: number;

    @IsString()
    @ApiProperty()
    name: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    description: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    contentWeb: string;

    @IsNumber()
    @IsOptional()@ApiProperty()
    price: number;

    @IsNumber()
    @IsOptional()@ApiProperty()
    status: number;


    @IsNumber()
    @IsOptional()@ApiProperty()
    fkService: number;


}