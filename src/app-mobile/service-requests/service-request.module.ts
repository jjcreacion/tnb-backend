import { Module } from '@nestjs/common';
import { RequestService } from './service-request.service';
import { RequestController } from './service-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestEntity } from './entities/service-request.entity';
import { UserModule } from '../../user/user.module'; 
import { RequestImageEntity } from '../../request-images/entities/request-image.entity'; 
import { DeviceModule } from '@/device/device.module'; 
import { MailerModule } from '@/mailer/mailer.module'; 
import { NotificacionesPushModule } from '@/notifications-push/notifications-push.module'; 
import { RequestNotificationModule } from './service-request-notification.module'; 
import { StatusListEntity } from './entities/status-list.entity'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([RequestEntity, RequestImageEntity, StatusListEntity]),
    UserModule,
    DeviceModule,
    MailerModule,
    NotificacionesPushModule,
    RequestNotificationModule,
  ],
  controllers: [RequestController],
  providers: [RequestService],
  exports: [RequestService],
})
export class ServiceRequestModule {}
