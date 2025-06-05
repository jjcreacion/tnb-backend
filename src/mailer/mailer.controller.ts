import { Body, Controller, Post } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { SendVerificationCodeDto } from './dto/send-verification-code.dto';

@Controller('mailer')
export class MailerController {
    constructor(private readonly mailerService: MailerService) {}

    @Post('send-code')
    async sendCode(@Body() dto: SendVerificationCodeDto) {
        const sent = await this.mailerService.sendVerificationCode(dto);
        return { success: sent };
    }
}