import { ApiProperty } from '@nestjs/swagger';

export class ReferredUserHistoryDto {
  @ApiProperty({ description: 'Nombre completo del usuario referido.' })
  referredFullName: string;

  @ApiProperty({ description: 'Monto de la recompensa aplicada.' })
  rewardAmount: number;

  @ApiProperty({ description: 'Fecha en que se completó la referencia.' })
  referredAt: Date;
}