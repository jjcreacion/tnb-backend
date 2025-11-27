import { Module } from '@nestjs/common';
import { RequestNotificationService } from './service-request-notification.service';
import { NotificacionesPushModule } from '@/notifications-push/notifications-push.module'; 
import { DeviceModule } from '@/device/device.module'; 
import { MailerModule } from '@/mailer/mailer.module'; 

@Module({
  imports: [
    NotificacionesPushModule, 
    DeviceModule, 
    MailerModule,
  ],
  providers: [RequestNotificationService],
  exports: [RequestNotificationService], 
})
export class RequestNotificationModule {}