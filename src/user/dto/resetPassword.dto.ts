import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({
    description: 'El email del usuario cuya contraseña se va a cambiar.',
    example: 'usuario@example.com',
  })
  @IsNotEmpty({ message: 'El email no puede estar vacío.' })
  @IsEmail({}, { message: 'El formato del email no es válido.' })
  email: string;

  @ApiProperty({
    description: 'La nueva contraseña para el usuario.',
    example: 'NuevaContrasena123!',
  })
  @IsNotEmpty({ message: 'La nueva contraseña no puede estar vacía.' })
  @IsString({ message: 'La nueva contraseña debe ser una cadena de texto.' })
  @MinLength(8, { message: 'La nueva contraseña debe tener al menos 8 caracteres.' })
  newPassword: string;
}