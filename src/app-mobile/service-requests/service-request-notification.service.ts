import { Injectable } from '@nestjs/common';
import { RequestEntity } from './entities/service-request.entity'; 
import { NotificationsService } from '@/notifications-push/notifications.service'; 
import { DeviceService } from '../../device/device.service';
import { MailerService } from '../../mailer/mailer.service';
import { NotificationsHistoryService } from '@/notifications/notification.service'; 
import { CreateNotificationDto } from '@/notifications/dto/create-notification.dto'; 
import { Notification } from '@/notifications/notification.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RequestNotificationService {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly deviceService: DeviceService,
    private readonly mailerService: MailerService,
    private readonly notificationsHistoryService: NotificationsHistoryService,
  ) {}

  async sendCreationNotifications(request: RequestEntity): Promise<void> {
    const user = request.fkUser; 
    const requestIdentifier = request.requestId.toString();

    const title = 'New Service Request Created! 🛠️';
    const body = `Your service request #${requestIdentifier} has been successfully submitted. We will review it shortly.`;
    const emailSubject = 'Service Request Submitted / Solicitud Recibida';
    
    if (!user || !user.pkUser) {
        console.warn(`User data is incomplete for request ${requestIdentifier}. Skipping notifications.`);
        return;
    }

   const historyDto: CreateNotificationDto = {
      fk_user: user.pkUser,
      title: title,
      body: body,
   };
   await this.notificationsHistoryService.saveNotification(historyDto);

    await this.sendRequestPushNotification(
      user.pkUser,
      request,
      'request_created',
      title,
      body,
    );

    if (user.email) {
      await this.sendRequestEmail(request, user.email, emailSubject, title, body);
    }

    const companyEmail = 'tnb@thenationalbuilders.com'; 
    const primaryPhone = user.person?.phones?.find(p => p.isPrimary) || user.person?.phones?.[0];

    try {
        await this.mailerService.sendMail({
        to: companyEmail,
        subject: `🚨 Nueva Solicitud: ${user.person?.firstName || 'Cliente'} ${user.person?.lastName || ''} - #${requestIdentifier}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #eee; padding: 20px;">
            <h2 style="color: #bd1011; border-bottom: 2px solid #bd1011; padding-bottom: 10px;">Nueva Solicitud de Servicio</h2>
            
            <h3 style="color: #333;">Datos del Cliente</h3>
            <p style="margin: 5px 0;"><strong>Nombre:</strong> ${user.person?.firstName || ''} ${user.person?.lastName || 'No proporcionado'}</p>
            <p style="margin: 5px 0;"><strong>Teléfono:</strong> ${primaryPhone?.phone || 'No proporcionado'}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${user.email}</p>
            
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            
            <h3 style="color: #333;">Detalles del Servicio</h3>
            <p style="margin: 5px 0;"><strong>Trade:</strong> ${request.fkCategory?.name || 'N/A'}</p>
            <p style="margin: 5px 0;"><strong>Service:</strong> ${request.fkSubCategory?.name || 'N/A'}</p>
            <p style="margin: 5px 0;"><strong>Dirección del Servicio:</strong> ${request.address}</p>
            
            <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 15px;">
              <strong>Descripción del trabajo:</strong><br>
              <p style="font-style: italic;">${request.serviceDescription || 'Sin descripción'}</p>
            </div>
            
            <p style="font-size: 12px; color: #999; margin-top: 20px;">ID de Referencia: #${requestIdentifier}</p>
          </div>
        `,
      });
    } catch (error) {
      console.error('Error enviando notificación interna a la empresa:', error);
    }
  }

  async sendStatusChangeNotifications(request: RequestEntity, newStatusName: string): Promise<void> {
    
    const user = request.fkUser; 
    
    const { notificationTitle, notificationBody, emailSubject, emailTitle, emailBody } =
      this.getNotificationTextsByStatus(request, newStatusName);

    if (!notificationTitle || !user || !user.pkUser) {
      return;
    }

    const historyDto: CreateNotificationDto = {
      fk_user: user.pkUser,
      title: notificationTitle,
      body: notificationBody,
    };

    await this.notificationsHistoryService.saveNotification(historyDto);
  
    await this.sendRequestPushNotification(
      user.pkUser,
      request,
      'request_status_update',
      notificationTitle,
      notificationBody,
    );

    if (user.email) {
      await this.sendRequestEmail(
        request,
        user.email,
        emailSubject,
        emailTitle,
        emailBody,
      );
    }
  }


  private getNotificationTextsByStatus(request: RequestEntity, statusName: string): {
    notificationTitle: string;
    notificationBody: string;
    emailSubject: string;
    emailTitle: string;
    emailBody: string;
  } {
    const requestIdentifier = request.requestId.toString();
    
    const title = `Service Request Status Update`;
    const body = `Your service request #${requestIdentifier} has been updated. The new status is: ${statusName}.`;
    
    return {
      notificationTitle: title,
      notificationBody: body,
      emailSubject: `Service Request Update: ${statusName}`,
      emailTitle: title,
      emailBody: body, 
    };
  }

  private async sendRequestPushNotification(
    userId: number,
    request: RequestEntity,
    type: string,
    title: string,
    body: string,
  ): Promise<void> {
    const activeTokens = await this.deviceService.getActiveTokensByUserId(userId);

    if (activeTokens.length === 0) {
      return;
    }

    const notificationData = {
      requestId: request.requestId.toString(),
      status: request.fkStatus?.statusId?.toString() || 'unknown',
      type: type,
    };

    await this.notificationsService.sendPushNotification(
      activeTokens,
      title,
      body,
      notificationData,
    );
  }

  private async sendRequestEmail(
    request: RequestEntity,
    email: string,
    subject: string,
    title: string,
    body: string,
  ): Promise<void> {
    
    const requestIdentifier = request.requestId.toString();
    const currentStatusName = request.fkStatus?.name || 'Status not available';
    
    const emailDto = {
      email: email,
      subject: subject,
      requestIdentifier: requestIdentifier,
      requestStatus: currentStatusName,
      title: title,
      body: body,
    };

    try {
      await this.mailerService.sendMail({
        to: emailDto.email,
        subject: emailDto.subject,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
              <h1>${emailDto.title}</h1>
              <p>${emailDto.body}</p>
              <p>Details:</p>
              <ul>
                <li>Request No: <strong>${emailDto.requestIdentifier}</strong></li>
                <li>Current Status: <strong>Submitted</strong></li>
              </ul>
              <p>Thank you for your patience.</p>
            </div>
          `,
      });
    } catch (error) {
      console.error(
        `Error sending request email to ${email}:`,
        error,
      );
    }
  }
}