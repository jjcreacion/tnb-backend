import { IsString, IsNotEmpty, IsNumber, IsOptional, IsBoolean, IsUrl, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMobileCampaignDto {
  @IsString({ message: 'El título debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El título es obligatorio.' })
  @ApiProperty({
    description: 'El título de la campaña móvil.',
    example: 'Campaña de Verano 2025',
  })
  title: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  @ApiProperty({
    description: 'Una descripción detallada de la campaña.',
    required: false,
    example: 'Promoción especial para la temporada de vacaciones.',
  })
  description?: string; 

  @IsUrl({}, { message: 'La URL de la imagen debe ser una URL válida.' })
  @IsNotEmpty({ message: 'La URL de la imagen es obligatoria.' })
  @ApiProperty({
    description: 'La URL de la imagen de la campaña.',
    example: '0101020022120.jpg',
  })
  imageUrl: string;

  @IsDateString({}, { message: 'La fecha de inicio debe ser una cadena de fecha válida (ISO 8601).' })
  @IsNotEmpty({ message: 'La fecha de inicio es obligatoria.' })
  @ApiProperty({
    description: 'La fecha y hora en que la campaña comienza (formato ISO 8601).',
    example: '2025-07-20T00:00:00Z',
  })
  startDate: string; 

  @IsDateString({}, { message: 'La fecha de fin debe ser una cadena de fecha válida (ISO 8601).' })
  @IsNotEmpty({ message: 'La fecha de fin es obligatoria.' })
  @ApiProperty({
    description: 'La fecha y hora en que la campaña finaliza (formato ISO 8601).',
    example: '2025-08-30T23:59:59Z',
  })
  endDate: string; 

  @IsOptional()
  @IsBoolean({ message: 'El estado activo debe ser un valor booleano.' })
  @ApiProperty({
    description: 'Indica si la campaña está activa. Por defecto es true.',
    required: false,
    example: true,
    default: true,
  })
  isActive?: boolean; 
}