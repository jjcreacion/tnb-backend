import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PersonNoteEntity} from "@/person-notes/entities/person-note.entity";
import {ContactEntity} from "@/contact/entities/contact.entity";
import { UserEntity } from '@/user/entities/user.entity';
import {PersonNotesController} from "@/person-notes/person-notes.controller";
import {PersonNotesService} from "@/person-notes/person-notes.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([PersonNoteEntity, ContactEntity, UserEntity]),
  ],
  controllers: [PersonNotesController],
  providers: [PersonNotesService],
  exports:[PersonNotesService]
})
export class PersonNotesModule {}