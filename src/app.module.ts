import { CampaignInterestModule } from '@/app-mobile/campaign-interest/campaign-interest.module';
import { ServiceRequestModule } from '@/app-mobile/service-requests/service-request.module';
import { ClientTypeModule } from '@/client-type/client-type.module';
import { CountryStatesModule } from '@/country-states/country-states.module';
import { CountryModule } from '@/country/country.module';
import { LocalityModule } from '@/locality/locality.module';
import { ServiceAddonsModule } from '@/service-addons/service-addons.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerModule, minutes } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import * as process from 'process';
import { MobileCampaignModule } from './app-mobile/campaigns/campaigns.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ClientTypeQuestionsModule } from './client-type-questions/client-type-questions.module';
import { ContactModule } from './contact/contact.module';
import { envValidationSchema } from './env.schema';
import { MailerModule } from './mailer/mailer.module';
import { PersonAddressModule } from './person-address/person-address.module';
import { PersonEmailsModule } from './person-emails/person-emails.module';
import { PersonNotesModule } from './person-notes/person-notes.module';
import { PersonPhonesModule } from './person-phones/person-phones.module';
import { PersonModule } from './person/person.module';
import { ProfileModule } from './profile/profile.module';
import { ServicesTypeModule } from './services-type/services-type.module';
import { StatusInfoModule } from './status-info/status-info.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { UserModule } from './user/user.module';
import { RequestStatusModule } from './request_status/request-status.module';
import { StatusListModule } from './status_list/status-list.module';
import { RequestImagesModule } from './request-images/request-images.module';
import { AppSettingsModule } from './app-settings/app-settings.module';
import { ReferralModule } from './referral-tracking/referral.module';
import { InvoiceModule } from './invoices/invoices.module';
import { DeviceModule } from './device/device.module'; 

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'var', 'www', 'images'),
      serveRoot: '/images',
    }),
    ConfigModule.forRoot({
      validationSchema: envValidationSchema,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: configService.get<number>('DATABASE_PORT'),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_SCHEMA,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
      }),
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    ThrottlerModule.forRoot([
      {
        ttl: minutes(1),
        limit: 10,
      },
    ]),
    AuthModule,
    UserModule,
    PersonModule,
    ProfileModule,
    CategoryModule,
    SubCategoryModule,
    ServicesTypeModule,
    ClientTypeModule,
    ServiceAddonsModule,
    ServiceRequestModule,
    CountryModule,
    CountryStatesModule,
    LocalityModule,
    ClientTypeQuestionsModule,
    PersonEmailsModule,
    PersonPhonesModule,
    PersonAddressModule,
    StatusInfoModule,
    ContactModule,
    MailerModule,
    PersonNotesModule,
    MobileCampaignModule,
    CampaignInterestModule,
    RequestStatusModule,
    StatusListModule,
    RequestImagesModule,
    AppSettingsModule,
    ReferralModule,
    InvoiceModule,
    DeviceModule
  ],
  controllers: [],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
})

/*export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthMiddleware).forRoutes("*")
  }
}*/
export class AppModule {}
