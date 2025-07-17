import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { CreateMobileCampaignDto } from './create-campaigns.dto'; 

export class UpdateMobileCampaignDto extends PartialType(CreateMobileCampaignDto) {
  @IsNumber({}, { message: 'El ID de la campaña debe ser un número.' })
  @IsNotEmpty({ message: 'El ID de la campaña es obligatorio.' })
  @ApiProperty({
    description: 'El identificador único de la campaña a actualizar.',
    example: 1,
  })
  campaignsId: number;
}