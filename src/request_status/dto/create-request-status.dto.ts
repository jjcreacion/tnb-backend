import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRequestStatusDto {
  @ApiProperty({
    description: 'ID de la solicitud de servicio a la que se le cambiará el estado.',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  requestId: number;

  @ApiProperty({ description: 'ID del estado anterior.', example: 1 })
  @IsInt()
  @IsNotEmpty()
  previousStatus: number;

  @ApiProperty({ description: 'ID del nuevo estado.', example: 2 })
  @IsInt()
  @IsNotEmpty()
  newStatusId: number;

  @ApiProperty({ description: 'ID del usuario que realiza el cambio.', example: 1 })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ description: 'Observación sobre el cambio de estado.', required: false })
  @IsOptional()
  @IsString()
  observation?: string;
}


  