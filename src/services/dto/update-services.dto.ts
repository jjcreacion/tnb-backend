import {ApiProperty, OmitType, PartialType} from '@nestjs/swagger';
import {ServicesEntity} from "@/services/entity/services.entity";
import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class UpdateServicesDto extends OmitType(ServicesEntity,
    ['createdAt','updatedAt','addons']
) {

    @ApiProperty()
    @IsNumber()
    pkService: number;

    @ApiProperty()@IsString()@IsNotEmpty()
    name: string;

    @ApiProperty()@IsString()@IsNotEmpty()
    description: string;

    @ApiProperty()@IsNumber()
    status: number;

    @ApiProperty()@IsNumber()
    fkSubCategory: number;

    @IsNumber()@ApiProperty()
    @IsNotEmpty({ message: 'Fk client type cannot be empty' })
    fkClientType : number;

    @IsNumber()@ApiProperty()
    @IsNotEmpty({ message: 'Fk service type cannot be empty' })
    fkServiceType : number;
}
