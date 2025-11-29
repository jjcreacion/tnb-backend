import { Module } from '@nestjs/common';
import { RequestNotificationService } from './service-request-notification.service';
import { NotificacionesPushModule } from '@/notifications-push/notifications-push.module'; 
import { DeviceModule } from '@/device/device.module'; 
import { MailerModule } from '@/mailer/mailer.module'; 
import { NotificationsHistoryService } from '@/notifications/notification.service';
import { Notification } from '@/notifications/notification.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationMapper } from '@/notifications/notification.mapper';
import { NotificationsModule } from '@/notifications/notification.module'; 

@Module({
  imports: [
    NotificacionesPushModule, 
    DeviceModule, 
    MailerModule,
    NotificationsModule,
    TypeOrmModule.forFeature([Notification]),
  ],
  providers: [RequestNotificationService, NotificationsHistoryService, NotificationMapper],
  exports: [RequestNotificationService, TypeOrmModule.forFeature([Notification]),], 
})
export class RequestNotificationModule {}