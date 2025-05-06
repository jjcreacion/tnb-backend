import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PersonPhoneEntity} from "@/person-phones/entities/person-phone.entity";
import {PersonPhoneService} from "@/person-phones/person-phones.service";
import {PersonPhoneController} from "@/person-phones/person-phones.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([PersonPhoneEntity]),
  ],
  controllers: [PersonPhoneController],
  providers: [PersonPhoneService],
  exports :[PersonPhoneService]
})
export class PersonPhonesModule {}
