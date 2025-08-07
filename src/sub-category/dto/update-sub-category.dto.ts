import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { SubCategoryEntity } from '@/sub-category/entity/sub-category.entity';
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateSubCategoryDto extends OmitType(SubCategoryEntity,
    ['createdAt','updatedAt','addons']
) {

    @ApiProperty()
    @IsNumber()
    pkSubCategory: number;

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
