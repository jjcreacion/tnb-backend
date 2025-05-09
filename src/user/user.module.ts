import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "@/user/entities/user.entity";
import {PersonEntity} from "@/person/entities/person.entity";
import {UserMapperModule} from "@/user/mapper/user.mapper.module";
import {PersonMapperModule} from "@/person/mapper/person.mapper.module";
import {ProfileMapperModule} from "@/profile/mapper/profile.mapper.module";

@Module({
  imports: [
      TypeOrmModule.forFeature([UserEntity, PersonEntity]),
      UserMapperModule,
      PersonMapperModule,
      ProfileMapperModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports:[ProfileMapperModule, UserService]
})
export class UserModule {}
