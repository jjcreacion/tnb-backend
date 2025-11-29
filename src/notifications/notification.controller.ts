import {
  Controller,
  Get,
  Patch,
  Param,
  ParseUUIDPipe,
  UseGuards,
  Body,
  HttpStatus,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { NotificationsHistoryService } from './notification.service';
import { NotificationResponseDto } from './dto/read-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsHistoryService) {}

  @Get('user/:userId')
  async getMyNotifications(
    @Param('userId', ParseIntPipe) userId: number, 
  ): Promise<NotificationResponseDto[]> {
    return this.notificationsService.findUserNotifications(userId);
  }

  @Patch('read/:id')
  async markNotificationAsRead(
    @Param('id', ParseIntPipe) notificationId: number,
  ): Promise<NotificationResponseDto> {
    return this.notificationsService.markAsRead(notificationId);
  } 
}