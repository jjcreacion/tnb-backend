import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import {ApiProperty, OmitType} from "@nestjs/swagger";
import {LocalityEntity} from "@/locality/entities/locality.entity";

export class CreateLocalityDto extends OmitType(LocalityEntity,
    ['updatedAt','updatedAt','state']
) {
    @IsString({ message: 'Name is required' })
    @IsNotEmpty({ message: 'Name cannot be empty' })
    @ApiProperty()
    name: string;

    @IsNumber({}, { message: 'State ID must be a number' })
    @IsNotEmpty({ message: 'State ID is required' })
    @ApiProperty()
    fkState: number;
}