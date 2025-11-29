import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationResponseDto } from './dto/read-notification.dto';
import { NotificationMapper } from './notification.mapper';

@Injectable()
export class NotificationsHistoryService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    private readonly mapper: NotificationMapper,
  ) {}

  async saveNotification(
    dto: CreateNotificationDto,
  ): Promise<Notification> {
    const newNotification = this.notificationRepository.create(dto);
    return this.notificationRepository.save(newNotification);
  }

  async findUserNotifications(userId: number): Promise<NotificationResponseDto[]> {
    const notifications = await this.notificationRepository.find({
      where: { fk_user: userId },
      order: { created_at: 'DESC' },
    });
    return this.mapper.toDtoList(notifications);
  }

  async markAsRead(notificationId: number): Promise<NotificationResponseDto> {
    const notification = await this.notificationRepository.findOne({
      where: { pk_notification: notificationId },
    });

    if (!notification) {
      throw new NotFoundException(
        `Notification with ID ${notificationId} not found or does not belong`,
      );
    }

    if (!notification.is_read) {
      notification.is_read = true;
      const updatedNotification = await this.notificationRepository.save(notification);
      return this.mapper.toDto(updatedNotification);
    }
    
    return this.mapper.toDto(notification);
  }
  
}