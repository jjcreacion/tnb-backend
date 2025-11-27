import { Injectable } from '@nestjs/common';
import { Invoice, InvoiceStatus } from './entities/invoice.entity';
import { NotificationsService } from '../notifications-push/notifications.service';
import { DeviceService } from '../device/device.service';
import { MailerService } from '../mailer/mailer.service';

@Injectable()
export class InvoiceNotificationService {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly deviceService: DeviceService,
    private readonly mailerService: MailerService,
  ) {}

  async sendCreationNotifications(invoice: Invoice): Promise<void> {
    const userId = invoice.fk_user;

    const amount = invoice.invoice_amount ? Number(invoice.invoice_amount) : 0; 
    const formattedAmount = amount.toFixed(2);

    const title = 'New Invoice Generated! 💰';
    const body = `Your invoice #${
      invoice.invoice_number || invoice.invoice_id
    } for $${formattedAmount} is now available.`;
    const emailSubject = 'Invoice Issued / Factura Emitida';
    const emailTitle = 'Invoice Created';

    if (userId !== null) {
      await this.sendInvoicePushNotification(
        userId,
        invoice,
        'new_invoice_created',
        title,
        body,
      );
    } else {
      console.warn(`User ID is null for invoice ${invoice.invoice_id}. Skipping push notification.`);
    }

    await this.sendInvoiceEmail(invoice, emailSubject, emailTitle, body);
  }

  async sendStatusChangeNotifications(invoice: Invoice): Promise<void> {
    const userId = invoice.fk_user;
    
    const { notificationTitle, notificationBody, emailSubject, emailBody } =
      this.getNotificationTextsByStatus(invoice);

    if (!notificationTitle) {
      return;
    }
    
    if (userId !== null) {
      await this.sendInvoicePushNotification(
        userId,
        invoice,
        'invoice_status_update',
        notificationTitle,
        notificationBody,
      );
    } else {
      console.warn(`User ID is null for invoice ${invoice.invoice_id}. Skipping status update push notification.`);
    }

    await this.sendInvoiceEmail(
      invoice,
      emailSubject,
      notificationTitle,
      emailBody,
    );
  }

  private getNotificationTextsByStatus(invoice: Invoice): {
    notificationTitle: string;
    notificationBody: string;
    emailSubject: string;
    emailBody: string;
  } {
    const defaultTexts = {
      notificationTitle: '',
      notificationBody: '',
      emailSubject: '',
      emailBody: '',
    };
    const invoiceIdentifier = invoice.invoice_number || invoice.invoice_id;
    
    //const amount = `$${invoice.invoice_amount?.toFixed(2) ?? '0.00'}`;

    const amount = invoice.invoice_amount ? Number(invoice.invoice_amount) : 0; 
    const formattedAmount = amount.toFixed(2);


    switch (invoice.invoice_status) {
      case InvoiceStatus.PAID:
        return {
          notificationTitle: 'Payment Confirmed! 🎉',
          notificationBody: `Your invoice #${invoiceIdentifier} has been successfully paid.`,
          emailSubject: 'Invoice Paid / Factura Pagada',
          emailBody: `Your invoice #${invoiceIdentifier} for ${formattedAmount} has been successfully paid.`,
        };
      case InvoiceStatus.CANCELLED:
        return {
          notificationTitle: 'Invoice Cancelled ❌',
          notificationBody: `Invoice #${invoiceIdentifier} has been cancelled.`,
          emailSubject: 'Invoice Cancelled / Factura Cancelada',
          emailBody: `Invoice #${invoiceIdentifier} has been cancelled. Please check the details.`,
        };
      case InvoiceStatus.PENDING: 
        return {
          notificationTitle: 'Payment Overdue! 🔔',
          notificationBody: `Invoice #${invoiceIdentifier} is now overdue. Please settle your payment promptly.`,
          emailSubject: 'Payment Overdue / Pago Vencido',
          emailBody: `Invoice #${invoiceIdentifier} is now overdue. Please settle your payment promptly.`,
        };
      default:
        return defaultTexts;
    }
  }

  private async sendInvoicePushNotification(
    userId: number,
    invoice: Invoice,
    type: string,
    title: string,
    body: string,
  ): Promise<void> {
    const activeTokens = await this.deviceService.getActiveTokensByUserId(
      userId,
    );

    if (activeTokens.length === 0) {
      return;
    }

    const notificationData = {
      invoiceId: invoice.invoice_id.toString(),
      status: invoice.invoice_status,
      type: type,
    };

    await this.notificationsService.sendPushNotification(
      activeTokens,
      title,
      body,
      notificationData,
    );
  }

  private async sendInvoiceEmail(
    invoice: Invoice,
    subject: string,
    title: string,
    body: string,
  ): Promise<void> {
    if (invoice.user && invoice.user.email && invoice.user.smsNotifications) {
      
     const amount = invoice.invoice_amount ? Number(invoice.invoice_amount) : 0;
     const formattedAmount = amount.toFixed(2);

      const emailDto = {
        email: invoice.user.email,
        subject: subject,
        invoiceNumber: invoice.invoice_number || invoice.invoice_id.toString(),
        invoiceAmount: formattedAmount, 
        title: title,
        body: body,
        publicLink: invoice.public_link,
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
                  <li>Invoice No: <strong>${emailDto.invoiceNumber}</strong></li>
                  <li>Amount: <strong>$${emailDto.invoiceAmount}</strong></li>
                  <li>Status: <strong>${invoice.invoice_status}</strong></li>
                </ul>
                ${
                  emailDto.publicLink
                    ? `<a href="${emailDto.publicLink}" style="background-color: #007bff; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">View Invoice</a>`
                    : ''
                }
              </div>
            `,
        });
      } catch (error) {
        console.error(
          `Error sending invoice email to ${invoice.user.email}:`,
          error,
        );
      }
    }
  }
}