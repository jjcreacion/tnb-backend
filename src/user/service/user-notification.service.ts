import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { DeviceService } from '@/device/device.service';
import { NotificationsService } from '@/notifications-push/notifications.service';
import { MailerService } from '@/mailer/mailer.service'; 

@Injectable()
export class UserNotificationService {
  constructor(
    private readonly deviceService: DeviceService,
    private readonly notificationsService: NotificationsService,
    private readonly mailerService: MailerService, 
  ) {}

  async sendReferralRewardNotification(
    referrerUserId: number,
    newUserWithPerson: UserEntity,
    rewardAmount: number,
    referrerEmail: string, 
  ): Promise<void> {
    
    const person = newUserWithPerson.person;
    let fullName = 'A new user';
    
    if (person && person.firstName && person.lastName) {
      fullName = `${person.firstName} ${person.lastName}`;
    }

    const title = 'Referral Reward Received! 💰';
    const body = `${fullName} registered using your code and you earned a reward of $${rewardAmount.toFixed(2)}! Your balance has been updated.`;
    
    const activeTokens = await this.deviceService.getActiveTokensByUserId(referrerUserId);

    if (activeTokens.length > 0) {
      const notificationData = {
        type: 'referral_reward',
        rewardAmount: rewardAmount.toFixed(2),
        referredUserId: newUserWithPerson.pkUser.toString(),
      };

      await this.notificationsService.sendPushNotification(
        activeTokens,
        title,
        body,
        notificationData,
      );
    }
    
    if (referrerEmail) {
        await this.sendReferralRewardEmail(
            referrerEmail,
            title,
            body,
            fullName,
            rewardAmount
        );
    }
  }
  
  private async sendReferralRewardEmail(
    to: string,
    subject: string,
    body: string,
    referredUserName: string,
    rewardAmount: number,
  ): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: to,
        subject: subject,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
              <h2>${subject}</h2>
              <p>Hello,</p>
              <p>${body}</p>
              <p>Details:</p>
              <ul>
                <li>New User: <strong>${referredUserName}</strong></li>
                <li>Reward Amount: <strong>$${rewardAmount.toFixed(2)}</strong></li>
              </ul>
              <p>Thank you for being part of our community!</p>
            </div>
          `,
      });
    } catch (error) {
      console.error(`Error sending referral reward email to ${to}:`, error);
    }
  }
}