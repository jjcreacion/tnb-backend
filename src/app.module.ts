import { TypeOrmModule  } from '@nestjs/typeorm'
import { ConfigModule, ConfigService  } from '@nestjs/config';
import {envValidationSchema} from './env.schema'
import * as process from "process";
import {JwtModule} from "@nestjs/jwt";
import {ThrottlerModule, minutes} from '@nestjs/throttler'
import {Module} from "@nestjs/common";
import { UserModule } from './user/user.module';
import { PersonModule } from './person/person.module';
import { ProfileModule } from './profile/profile.module';
import { CategoryModule } from './category/category.module';
import { ServicesModule } from '@/services/services.module';
import { ServicesTypeModule } from './services-type/services-type.module';
import {SubCategoryModule} from "@/sub-category/sub-Category.module";
import {ServiceAddonsModule} from "@/service-addons/service-addons.module";
import {ClientTypeModule} from "@/client-type/client-type.module";
import {CountryModule} from "@/country/country.module";
import {CountryStatesModule} from "@/country-states/country-states.module";
import {LocalityModule} from "@/locality/locality.module";
import { ServiceRequestModule } from "@/app-mobile/service-requests/service-request.module";
import { ClientTypeQuestionsModule } from './client-type-questions/client-type-questions.module';
import { PersonEmailsModule } from './person-emails/person-emails.module';
import { PersonPhonesModule } from './person-phones/person-phones.module';
import { PersonAddressModule } from './person-address/person-address.module';
import { ContactModule } from './contact/contact.module';
import { StatusInfoModule } from './status-info/status-info.module';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [
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
        entities: [__dirname  + "/**/*.entity{.ts,.js}"], 
        synchronize: false,
      }),
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    ThrottlerModule.forRoot([{
      ttl: minutes(1),
      limit: 10,
    }]),
    UserModule,
    PersonModule,
    ProfileModule,
    CategoryModule,SubCategoryModule,
    ServicesModule,ServicesTypeModule,
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
    MailerModule
  ],
  controllers: [],
  providers: [],
})

/*export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthMiddleware).forRoutes("*")
  }
}*/
export class AppModule   {

}
