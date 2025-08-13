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
            const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${dto.token}`;
            
            await this.transporter.sendMail({
                ...MAILER_OPTIONS,
                to: dto.email,
                subject: 'Restablecimiento de Contraseña',
                text: `Hola ${dto.userName || 'Usuario'},\n\nPara restablecer tu contraseña, haz clic en el siguiente enlace: ${resetUrl}\n\nEste enlace expirará en 1 hora.\n\nSi no solicitaste este cambio, puedes ignorar este email.`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                            <h1 style="color: white; margin: 0; font-size: 28px;">Restablecimiento de Contraseña</h1>
                        </div>
                        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
                            <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
                                Hola <strong>${dto.userName || 'Usuario'}</strong>,
                            </p>
                            <p style="font-size: 16px; color: #333; margin-bottom: 25px;">
                                Recibimos una solicitud para restablecer la contraseña de tu cuenta. 
                                Si fuiste tú quien hizo esta solicitud, haz clic en el botón de abajo:
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
                                    Restablecer Contraseña
                                </a>
                            </div>
                            <p style="font-size: 14px; color: #666; margin-top: 25px;">
                                <strong>⏰ Este enlace expirará en 1 hora por seguridad.</strong>
                            </p>
                            <p style="font-size: 14px; color: #666; margin-top: 15px;">
                                Si no puedes hacer clic en el botón, copia y pega este enlace en tu navegador:
                            </p>
                            <p style="font-size: 12px; color: #888; word-break: break-all; background: #fff; padding: 10px; border-radius: 5px; border: 1px solid #ddd;">
                                ${resetUrl}
                            </p>
                            <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0;">
                            <p style="font-size: 14px; color: #666; margin-bottom: 0;">
                                Si no solicitaste este cambio de contraseña, puedes ignorar este email con seguridad. 
                                Tu contraseña no será modificada.
                            </p>
                        </div>
                    </div>
                `,
            });
            return true;
        } catch (error) {
            console.error('Error enviando email de reset:', error);
            return false;
        }
    }
}