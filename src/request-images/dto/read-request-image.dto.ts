import { ApiProperty } from '@nestjs/swagger';

export class ReadRequestImageDto {
  @ApiProperty({
    description: 'ID de la imagen de la solicitud.',
    example: 1,
  })
  imageId: number;

  @ApiProperty({
    description: 'ID de la solicitud de servicio asociada.',
    example: 1,
  })
  fkRequestId: number;

  @ApiProperty({
    description: 'URL de la imagen.',
    example: '/images/service-request/image-123.png',
  })
  urlImage: string;

  @ApiProperty({
    description: 'Fecha de creación del registro de la imagen.',
    example: '2023-10-27T10:00:00Z',
  })
  createdAt: Date;
}

