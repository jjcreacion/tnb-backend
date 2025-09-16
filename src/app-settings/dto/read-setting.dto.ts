import { ApiProperty } from '@nestjs/swagger';

export class ReadSettingDto {
  @ApiProperty({ example: 'setting_key' })
  key: string;

  @ApiProperty({ example: 'setting_value' })
  value: string;
}

