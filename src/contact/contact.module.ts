import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContactEntity } from "@/contact/entities/contact.entity";
import { PersonEntity } from "@/person/entities/person.entity";
import { UserEntity } from '@/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContactEntity, PersonEntity, UserEntity ]),
  ],
  controllers: [ContactController],
  providers: [ContactService],
  exports:[ContactService]
})
export class ContactModule {}
