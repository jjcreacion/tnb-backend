import { Module } from '@nestjs/common';
import { PersonAddressService } from './person-address.service';
import { PersonAddressController } from './person-address.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PersonPhoneEntity} from "@/person-phones/entities/person-phone.entity";
import {PersonAddressEntity} from "@/person-address/entities/person-address.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([PersonAddressEntity]),
  ],
  controllers: [PersonAddressController],
  providers: [PersonAddressService],
  exports:[PersonAddressService]
})
export class PersonAddressModule {}
