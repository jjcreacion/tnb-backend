import { ApiProperty } from '@nestjs/swagger';

export class SendPasswordResetDto {
  @ApiProperty({
    description: 'Email del destinatario',
    example: 'usuario@ejemplo.com',
  })
  email: string;

  @ApiProperty({
    description: 'Token de restablecimiento',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  token: string;

  @ApiProperty({
    description: 'Nombre del usuario (opcional)',
    example: 'Juan Pérez',
  })
  userName?: string;
}
