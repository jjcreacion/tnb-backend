import { OmitType } from '@nestjs/mapped-types';
import { StatusInfoEntity } from '../entities/status-info.entity';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStatusInfoDto extends OmitType(StatusInfoEntity, [
    'createdAt',
    'updatedAt',
]) {
    @IsNumber()
    @ApiProperty()
    pkStatus: number;

    @IsString()
    @ApiProperty({ required: false })
    name: string;

    @IsString()
    @ApiProperty({ required: false })
    description: string;

    @IsNumber()
    @ApiProperty({ required: false })
    isEnabled: number;
}
