import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class NotificationResponseDto {
  @Expose()
  @ApiProperty({ description: 'ID de la notificación (UUID)' })
  id: string;

  @Expose()
  @ApiProperty({ description: 'Título de la notificación' })
  title: string;

  @Expose()
  @ApiProperty({ description: 'Cuerpo/mensaje de la notificación' })
  body: string;

  @Expose()
  @ApiProperty({ description: 'Estado de lectura (true si está leído)' })
  isRead: boolean;

  @Expose()
  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;
}