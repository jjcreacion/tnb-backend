import { PersonAddressEntity } from "@/person-address/entities/person-address.entity";
import { PersonPhoneEntity } from "@/person-phones/entities/person-phone.entity";
import { PersonEntity } from "@/person/entities/person.entity";
import { PersonMapperModule } from "@/person/mapper/person.mapper.module";
import { ProfileMapperModule } from "@/profile/mapper/profile.mapper.module";
import { UserEntity } from "@/user/entities/user.entity";
import { ReferralHistoryEntity } from "@/user/entities/referral-history.entity";
import { UserMapperModule } from "@/user/mapper/user.mapper.module";
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { AppSettingsEntity } from '@/app-settings/entities/app-settings.entity';
import { UserNotificationService } from './service/user-notification.service'; 
import { NotificacionesPushModule  } from '@/notifications-push/notifications-push.module'; 
import { DeviceModule } from '@/device/device.module'; 
import { MailerModule } from '@/mailer/mailer.module';
import { NotificationsModule } from '@/notifications/notification.module'; 


@Module({
  imports: [
      TypeOrmModule.forFeature([UserEntity, ReferralHistoryEntity, PersonEntity, PersonPhoneEntity, PersonAddressEntity,AppSettingsEntity]),
      UserMapperModule,
      PersonMapperModule,
      ProfileMapperModule,
      NotificationsModule,
      JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECRET'), 
          signOptions: { expiresIn: '12h' }, 
      }),
    }),
    NotificacionesPushModule,
    DeviceModule,
    MailerModule,  
  ],
  controllers: [UserController],
  providers: [UserService, UserNotificationService],
  exports:[ProfileMapperModule, UserService]
})
export class UserModule {}

