import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { InvoiceService } from './invoices.service';
import { InvoiceController } from './invoices.controller';
import { UserModule } from '@/user/user.module';
import { InvoiceNotificationService } from './invoice-notification.service';
import { DeviceModule } from '@/device/device.module'; 
import { MailerModule } from '@/mailer/mailer.module'; 
import { NotificacionesPushModule } from '@/notifications-push/notifications-push.module';
import { NotificationsModule } from '@/notifications/notification.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Invoice]),
    UserModule,
    DeviceModule,
    MailerModule,
    NotificacionesPushModule,
    NotificationsModule
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService, InvoiceNotificationService],
  exports: [InvoiceService],
})
export class InvoiceModule {}
