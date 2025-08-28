import { ApiProperty } from '@nestjs/swagger';
import { ReadMobileCampaignDto } from '../../campaigns/dto/read-campaigns.dto';
import { ReadUserDto } from '../../../user/dto/readUser.dto';

export class ReadCampaignInterestDto {
  @ApiProperty({ example: 1, description: 'ID del interés de campaña' })
  pk_interests: number;

  @ApiProperty({ example: '2023-07-31T10:00:00Z', description: 'Fecha y hora en que se expresó el interés' })
  expressedAt: Date;

  @ApiProperty({ type: () => ReadUserDto, description: 'Información del usuario que expresó el interés' })
  user: ReadUserDto;

  @ApiProperty({ type: () => ReadMobileCampaignDto, description: 'Información de la campaña en la que se expresó el interés' })
  campaign: ReadMobileCampaignDto;
}