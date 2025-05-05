import { OmitType } from '@nestjs/mapped-types';
import { StatusInfoEntity } from '../entities/status-info.entity';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStatusInfoDto extends OmitType(StatusInfoEntity, [
    'pkStatus',
    'createdAt',
    'updatedAt',
]) {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @ApiProperty({ required: false })
    description: string;
}
