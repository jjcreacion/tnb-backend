import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    description: 'Email del usuario para restablecer contraseña',
    example: 'usuario@ejemplo.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
