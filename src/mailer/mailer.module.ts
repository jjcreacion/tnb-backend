import { Module } from '@nestjs/common';
import { MailerController } from './mailer.controller';
import { MailerService } from './mailer.service';

@Module({
    controllers: [MailerController],
    providers: [MailerService],
    exports: [MailerService], // Exportar el servicio para que esté disponible en otros módulos
})
export class MailerModule {}