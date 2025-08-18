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
        text: `Tu código de verificación es: ${dto.code}`,
        html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #2563eb;">Verificación de Email</h2>
                        <p>Por favor utiliza el siguiente código para verificar tu email:</p>
                        <div style="background: #f3f4f6; padding: 16px; text-align: center; font-size: 24px; letter-spacing: 2px; margin: 20px 0;">
                            ${dto.code}
                        </div>
                        <p>Este código expirará en 15 minutos.</p>
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
