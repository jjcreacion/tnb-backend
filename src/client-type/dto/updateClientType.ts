import { PartialType } from '@nestjs/swagger';
import {IsNumber, IsString, IsOptional, IsDate} from 'class-validator';
import {ClientTypeEntity} from "@/client-type/entities/clientType.entity";

export class UpdateClientTypeDto extends PartialType(ClientTypeEntity) {
    @IsNumber()
    pkType: number;

    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsNumber()
    status: number;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;
}