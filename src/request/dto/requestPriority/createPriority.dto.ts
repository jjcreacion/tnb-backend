import {ApiProperty, OmitType} from "@nestjs/swagger";
import {RequestPriorityEntity} from "@/request/entities/requestPriority.entity";
import {IsNotEmpty, IsString} from "class-validator";

export class CreateRequestPriorityDto extends OmitType(RequestPriorityEntity, [
    'id','status','createdAt','updatedAt','request'
]){

    @ApiProperty({ description: 'priority name ', example: 'text' })
    @IsString() @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'priority description ', example: 'text' })
    @IsString()
    description: string;
}