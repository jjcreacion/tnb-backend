import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PersonEntity} from "@/person/entities/person.entity";
import {PersonPhoneEntity} from "@/person-phones/entities/person-phone.entity";
import {PersonPhoneController} from "@/person-phones/person-phones.controller";
import {PersonPhoneService} from "@/person-phones/person-phones.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([PersonPhoneEntity]),
  ],
  controllers: [PersonPhoneController],
  providers: [PersonPhoneService],
  exports :[PersonPhoneService]
})
export class PersonPhonesModule {}
