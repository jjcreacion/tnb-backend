import { IsNumber, IsNotEmpty } from 'class-validator'; 
import { ApiProperty } from '@nestjs/swagger';

export class UploadProfileImageDto {
  @ApiProperty({
    description: 'El ID único del usuario al que se le asociará la imagen de perfil.',
    example: 1, 
  })
  @IsNotEmpty({ message: 'El ID de usuario no puede estar vacío.' })
  @IsNumber({}, { message: 'El ID de usuario debe ser un número válido.' })
  pkUser: number;
}