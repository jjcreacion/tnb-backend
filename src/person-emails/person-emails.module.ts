import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PersonPhoneEntity} from "@/person-phones/entities/person-phone.entity";
import {PersonEmailEntity} from "@/person-emails/entities/person-email.entity";
import {PersonEmailController} from "@/person-emails/person-emails.controller";
import {PersonEmailService} from "@/person-emails/person-emails.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([PersonEmailEntity]),
  ],
  controllers: [PersonEmailController],
  providers: [PersonEmailService],
  exports:[PersonEmailService]
})
export class PersonEmailsModule {}
