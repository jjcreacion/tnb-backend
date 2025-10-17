import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { MAILER_OPTIONS, MAILER_TRANSPORT } from './constanst/mailer.constants';
import { SendPasswordResetDto } from './dto/send-password-reset.dto';
import { SendVerificationCodeDto } from './dto/send-verification-code.dto';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport(MAILER_TRANSPORT);
  }

  async sendVerificationCode(dto: SendVerificationCodeDto): Promise<boolean> {
    try {
      await this.transporter.sendMail({
        ...MAILER_OPTIONS,
        to: dto.email,
        subject: `${dto.code} is your code for TNB`,
        html: `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f6f8; padding: 20px; line-height: 1.6; margin: 0; box-sizing: border-box;">
    <div style="max-width: 800px; margin: 0 auto; background-color: white; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);">
      <div style="height: 4px; background-color: #bd1011;"></div>
        <div style="padding: 15px 40px; border-bottom: 1px solid #e0e0e0; background-color: #fef4f4;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td align="left">
                  <a href="https://www.thenationalbuilders.com/" style="display:inline-block;text-decoration: none; color: inherit;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding-right: 8px; vertical-align: middle;">
                          <img
                            src="https://static.wixstatic.com/media/9c545c_653592f38a4244f48b32f17ee8c4b393~mv2.png/v1/fill/w_111,h_102,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/9c545c_653592f38a4244f48b32f17ee8c4b393~mv2.png"
                            width="70"
                            alt="TNB"
                            style="border: 0; display: block; max-width: 100%;"
                          />
                        </td>
                        <td style="vertical-align: middle;">
                          <span style="font-size: 24px; font-weight: 600; color: #bd1010; line-height: 1;">TNB</span>
                        </td>
                      </tr>
                    </table>
                  </a>
                </td>
              </tr>
            </table>
        </div>

      <div style="padding: 40px;">
        <h1 style="font-size: 25px; font-weight: 600; color: #1a1a1a; margin-bottom: 20px;">Verification code</h1>

        <p style="font-size: 16px; color: #333; margin-bottom: 30px;">
          Please use the following code to verify your identity and sign up for
          your TNB account.
        </p>

        <div style="border: 1px solid #b0e7ff; font-size: 30px; font-weight: 700; color: #1a1a1a; margin-bottom: 30px; background-color: #dcf5fe; text-align: center; padding-top: 10px; padding-bottom: 10px;"> 
          ${dto.code} 
        </div>

        <p style="font-size: 16px; color: #333; margin-bottom: 5px;">This code will expire in 15 minutes.</p>
        <p style="font-size: 16px; color: #333; margin-bottom: 5px;">
          If you did not request this code, please ignore this message.
        </p>
        <p style="font-size: 16px; color: #333; margin-bottom: 5px;">
         Need help? Contact our 
          <a href="https://www.thenationalbuilders.com/contactus" style="color: #2765cf; text-decoration: none; font-weight: bold;">Customer Support Team</a>.
        </p>
      </div>

      <div style="padding: 30px 40px; background-color: #fafafa; border-top: 1px solid #e0e0e0;">
        <div style="display: flex; gap: 30px; margin-bottom: 20px;">
          <a href="#" style="color: #2765cf; text-decoration: none; font-size: 14px; font-weight: bold;">Security & Privacy</a>
          <a href="https://www.thenationalbuilders.com/contactus" style="color: #2765cf; text-decoration: none; font-size: 14px; font-weight: bold; margin-left:30px;">Contact Us</a>
        </div>
        <p style="font-size: 14px; color: #666;">© TNB - 9101 LBJ Freeway, Dallas, Texas, 75243</p>
      </div>
    </div>
  </div>
              `,
      });
      return true;
    } catch (error) {
      console.error('Error enviando email:', error);
      return false;
    }
  }

  async sendPasswordReset(dto: SendPasswordResetDto): Promise<boolean> {
    try {
      const resetUrl = `${process.env.FRONTEND_URL || 'http://216.246.113.71'}/auth/reset-password?token=${dto.token}`;
      // const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/reset-password?token=${dto.token}`;

      await this.transporter.sendMail({
        ...MAILER_OPTIONS,
        to: dto.email,
        subject: 'Password Reset',
        text: `Hello ${dto.userName || 'User'},\n\nTo reset your password, click on the following link: ${resetUrl}\n\nThis link will expire in 1 hour.\n\nIf you didn't request this change, you can ignore this email.`,
        html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                            <h1 style="color: white; margin: 0; font-size: 28px;">Password Reset</h1>
                        </div>
                        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
                            <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
                                Hello <strong>${dto.userName || 'User'}</strong>,
                            </p>
                            <p style="font-size: 16px; color: #333; margin-bottom: 25px;">
                                We received a request to reset the password for your account. 
                                If you made this request, click the button below:
                            </p>
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="${resetUrl}" 
                                   style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                                          color: white; 
                                          padding: 15px 30px; 
                                          text-decoration: none; 
                                          border-radius: 25px; 
                                          font-weight: bold; 
                                          font-size: 16px; 
                                          display: inline-block;
                                          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);">
                                    Reset Password
                                </a>
                            </div>
                            <p style="font-size: 14px; color: #666; margin-top: 25px;">
                                <strong>⏰ This link will expire in 1 hour for security.</strong>
                            </p>
                            <p style="font-size: 14px; color: #666; margin-top: 15px;">
                                If you can't click the button, copy and paste this link into your browser:
                            </p>
                            <p style="font-size: 12px; color: #888; word-break: break-all; background: #fff; padding: 10px; border-radius: 5px; border: 1px solid #ddd;">
                                ${resetUrl}
                            </p>
                            <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0;">
                            <p style="font-size: 14px; color: #666; margin-bottom: 0;">
                                If you didn't request this password change, you can safely ignore this email. 
                                Your password will not be modified.
                            </p>
                        </div>
                    </div>
                `,
      });
      return true;
    } catch (error) {
      console.error('Error sending reset email:', error);
      return false;
    }
  }
}
