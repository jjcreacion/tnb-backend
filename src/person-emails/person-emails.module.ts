import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PersonEmailEntity} from "@/person-emails/entities/person-email.entity";
import {PersonEntity} from "@/person/entities/person.entity";
import { UserEntity } from '@/user/entities/user.entity';
import {PersonEmailController} from "@/person-emails/person-emails.controller";
import {PersonEmailService} from "@/person-emails/person-emails.service";


@Module({
  imports: [
    TypeOrmModule.forFeature([PersonEmailEntity, PersonEntity, UserEntity]),

  ],
  controllers: [PersonEmailController],
  providers: [PersonEmailService],
  exports:[PersonEmailService]
})
export class PersonEmailsModule {}
