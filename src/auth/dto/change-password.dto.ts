import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'ID del usuario',
    example: 1,
  })
  @IsNotEmpty()
  pkUser: number;

  @ApiProperty({
    description: 'Contraseña actual del usuario',
    example: 'contraseñaActual123',
  })
  @IsNotEmpty()
  currentPassword: string;

  @ApiProperty({
    description: 'Nueva contraseña del usuario',
    example: 'nuevaContraseña123',
    minLength: 6,
  })
  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;
}
