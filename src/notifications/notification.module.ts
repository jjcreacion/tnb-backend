import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsHistoryService } from './notification.service';
import { NotificationsController } from './notification.controller';
import { Notification } from './notification.entity';
import { NotificationMapper } from './notification.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Notification])],
  controllers: [NotificationsController],
  providers: [NotificationsHistoryService, NotificationMapper],
  exports: [NotificationsHistoryService], 
})
export class NotificationsModule {}