import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Notification } from './notification.entity';
import { NotificationResponseDto } from './dto/read-notification.dto';

@Injectable()
export class NotificationMapper {
  toDto(entity: Notification): NotificationResponseDto {
    return plainToInstance(NotificationResponseDto, {
      id: entity.pk_notification,
      title: entity.title,
      body: entity.body,
      isRead: !!entity.is_read, 
      createdAt: entity.created_at,
    });
  }

  toDtoList(entities: Notification[]): NotificationResponseDto[] {
    return entities.map((entity) => this.toDto(entity));
  }
}