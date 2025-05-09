import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PersonPhoneEntity} from "@/person-phones/entities/person-phone.entity";
import {PersonPhoneService} from "@/person-phones/person-phones.service";
import {PersonPhoneController} from "@/person-phones/person-phones.controller";
import {PersonEntity} from "@/person/entities/person.entity";
import { UserEntity } from '@/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PersonPhoneEntity, PersonEntity, UserEntity]),
  ],
  controllers: [PersonPhoneController],
  providers: [PersonPhoneService],
  exports :[PersonPhoneService]
})
export class PersonPhonesModule {}
