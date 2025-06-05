import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SendVerificationCodeDto } from './dto/send-verification-code.dto';
import { MAILER_TRANSPORT, MAILER_OPTIONS } from './constanst/mailer.constants';

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
}