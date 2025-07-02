import {
  IsInt,
  IsString,
  IsOptional,
  IsNotEmpty,
  ValidateNested,
  IsPhoneNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAddressDto {
  @ApiProperty({
    description: 'La dirección del usuario.',
    example: 'Calle Principal #123',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  address?: string;

  @ApiProperty({
    description: 'Indica si esta dirección es la principal.',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  isPrimary?: number;
}

export class UpdatePhoneDto {
  @ApiProperty({
    description: 'El número de teléfono del usuario.',
    example: '0412-1234567',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  phone?: string;

  @ApiProperty({
    description: 'Indica si este teléfono es el principal.',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  isPrimary?: number;
}

export class UpdatePersonDto {
  @ApiProperty({
    description: 'El primer nombre del usuario.',
    example: 'Juan',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstName?: string;

  @ApiProperty({
    description: 'El apellido del usuario.',
    example: 'Pérez',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastName?: string;

  @ApiProperty({
    description: 'Una lista de objetos de dirección para actualizar o agregar.',
    type: [UpdateAddressDto],
    required: false,
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateAddressDto)
  addresses?: UpdateAddressDto[];

  @ApiProperty({
    description: 'Una lista de objetos de teléfono para actualizar o agregar.',
    type: [UpdatePhoneDto],
    required: false,
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdatePhoneDto)
  phones?: UpdatePhoneDto[];
}

export class UpdateUserProfileDto {
  @ApiProperty({
    description: 'La clave primaria del usuario (pk_user).',
    example: 24,
  })
  @IsInt()
  pkUser: number;

  @ApiProperty({
    description: 'El correo electrónico del usuario. Opcional, si no se envía, no se actualiza.',
    example: 'nuevo.email@example.com',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  email?: string;

  @ApiProperty({
    description: 'Datos de la persona asociada al usuario.',
    type: UpdatePersonDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdatePersonDto)
  person?: UpdatePersonDto;
}