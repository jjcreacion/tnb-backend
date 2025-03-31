import { Module } from '@nestjs/common';
import { PersonService } from './service/person.service';
import { PersonController } from './controller/person.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PersonEntity} from "@/person/entities/person.entity";
import {PersonMapperModule} from "@/person/mapper/person.mapper.module";

@Module({
  imports: [
      PersonMapperModule,
    TypeOrmModule.forFeature([PersonEntity]),
  ],
  controllers: [PersonController],
  providers: [PersonService],
  exports:[PersonService]
})
export class PersonModule {}
