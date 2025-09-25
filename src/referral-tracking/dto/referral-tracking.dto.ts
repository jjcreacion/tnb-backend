import { ApiProperty } from '@nestjs/swagger';

export class ReferralClaimResponseDto {
  @ApiProperty({ description: 'El ID de seguimiento utilizado para reclamar el código.' })
  trackingId: string;

  @ApiProperty({ description: 'El código de referido que debe ser guardado y usado por el nuevo usuario.' })
  referralCode: string;

  @ApiProperty({ description: 'Indica si el reclamo fue exitoso.' })
  success: boolean;
}

export class ReferralTrackingDto {
  @ApiProperty({ description: 'Identificador único del seguimiento (UUID).' })
  id: string;

  @ApiProperty({ description: 'Código de referido asociado.' })
  referralCode: string;

  @ApiProperty({ description: 'Indica si el código ya fue reclamado.' })
  isClaimed: boolean;

  @ApiProperty({ description: 'Fecha de creación del seguimiento.' })
  createdAt: Date;
}