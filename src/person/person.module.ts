import { Module } from '@nestjs/common';
import { PersonService } from './service/person.service';
import { PersonController } from '@/person/controller/person.controller';

@Module({
  controllers: [PersonController],
  providers: [PersonService],
})
export class PersonModule {}
