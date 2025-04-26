import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProfileEntity} from "@/profile/entities/profile.entity";
import {ProfileMapperModule} from "@/profile/mapper/profile.mapper.module";
import {UserService} from "@/user/service/user.service";
import {UserModule} from "@/user/user.module";

@Module({
  imports: [
      ProfileMapperModule,
      UserModule,
    TypeOrmModule.forFeature([ProfileEntity]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
