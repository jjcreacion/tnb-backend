
import { ApiProperty } from '@nestjs/swagger';

export class UploadCampaignImageDto {
  @ApiProperty({ type: 'string', format: 'binary', description: 'El archivo de imagen de la campaña.' })
  file: any; 
}