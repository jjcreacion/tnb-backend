import {ApiProperty, OmitType} from "@nestjs/swagger";
import {RequestEntity} from "@/request/entities/request.entity";
import {IsDate, IsNotEmpty, IsNumber, IsPositive, IsString, MinDate, MinLength} from "class-validator";

export class CreateRequestDto extends OmitType(RequestEntity, [
    'id','status','createdAt','updatedAt'
]){

    @ApiProperty({ description: 'Request date ', example: '2025-12-31',  })
    @IsNotEmpty() @IsDate() @MinDate(new Date(), {message:"The entered date should be the current date or later."})
    dateRequest: Date;

    @ApiProperty({ description: 'request description ', example: 'text' })
    @IsString()
    description: string;

    @ApiProperty({ description: 'Person primary Keys ', example: '771' })
    @IsNumber() @IsPositive() @IsNotEmpty()
    fkPerson: number;

    @ApiProperty({ description: 'Service primary Keys ', example: '771' })
    @IsNumber() @IsPositive() @IsNotEmpty()
    fkService: number;

    @ApiProperty({ description: 'priority primary Keys ', example: '771' })
    @IsNumber() @IsPositive() @IsNotEmpty()
    fkPriority: number;

    @ApiProperty({ description: 'Location primary Keys ', example: '[771,772,773]' })
    @IsNumber({}, { each: true }) @IsPositive({ each: true }) @IsNotEmpty({ each: true })
    fkLocations: number[];

    @ApiProperty({ description: 'Images primary Keys ', example: '[771,772,773]' })
    @IsNumber({}, { each: true }) @IsPositive({ each: true }) @IsNotEmpty({ each: true })
    fkImages: number[];

}
