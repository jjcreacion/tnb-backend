import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PersonEntity} from "@/person/entities/person.entity";
import {PersonMapperModule} from "@/person/mapper/person.mapper.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([PersonEntity]),
  ],
  controllers: [PersonController],
  providers: [PersonService],
  exports:[PersonService]
})
export class PersonModule {}

