import { TypeOrmModule  } from '@nestjs/typeorm'
import { ConfigModule, ConfigService  } from '@nestjs/config';
import {envValidationSchema} from './env.schema'
import * as process from "process";
import {JwtModule} from "@nestjs/jwt";
import {ThrottlerModule, minutes} from '@nestjs/throttler'
import {Module} from "@nestjs/common";
import { RequestModule } from './request/request.module';
import { UserModule } from './user/user.module';
import { PersonModule } from './person/person.module';
import { ProfileModule } from './profile/profile.module';
import { CategoryModule } from './category/category.module';
import { CategoryServiceModule } from '@/category/categoryService.module';
import {SubCategoryModule} from "@/category/subCategory.module";
import { ServiceStypeModule } from './category/serviceStype.module';
import {ClientTypeModule} from "@/clientType/clientType.module";
import {ServiceAddonsModule} from "@/category/serviceAddons.module";
import { CountryModule } from './country/country.module';
import { CountryStatesModule } from '@/countryStates/country-states.module';
import { LocalityModule } from './locality/locality.module';
import { LocalityTypeModule } from './locality-type/locality-type.module';

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
        port: configService.get<number>('DATABASE_PORT'), // Usa configService.get<>() para tornar el valor a number
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_SCHEMA,
        entities: [__dirname  + "/**/*.entity{.ts,.js}"], // Encuentra todos los archivos que tengan ".entitity de tipo js o ts de cualquier carpeta
        synchronize: false,
      }),
    }),
    JwtModule.register({
      secret: process.env.JwT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    ThrottlerModule.forRoot([{
      ttl: minutes(1),
      limit: 10,
    }]),
    RequestModule,
    UserModule,
    PersonModule,
    ProfileModule,
    CategoryModule,SubCategoryModule,
    CategoryServiceModule,ServiceStypeModule,
    ClientTypeModule,
    ServiceAddonsModule,
    CountryModule,
    CountryStatesModule,
    LocalityModule,
    LocalityTypeModule

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
