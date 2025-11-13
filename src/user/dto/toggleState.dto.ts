import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class ToggleStateDto {
  @ApiProperty({
    description: 'El nuevo estado para la notificación (true/false).',
    example: false,
  })
  @IsBoolean()
  status: boolean;
}

