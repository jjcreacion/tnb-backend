import { ApiProperty, PartialType } from '@nestjs/swagger';
import {IsNumber, IsString, IsOptional, IsDate} from 'class-validator';
import {ClientTypeEntity} from "@/client-type/entities/clientType.entity";

export class UpdateClientTypeDto extends PartialType(ClientTypeEntity) {
    @IsNumber() @ApiProperty()
    pkType: number;

    @IsString()@ApiProperty()
    name: string;

    @IsString()
    @IsOptional()@ApiProperty()
    description: string;

    @IsNumber()@ApiProperty()
    status: number;


}