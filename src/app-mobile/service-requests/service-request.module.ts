import { Module } from '@nestjs/common';
import { RequestService } from './service-request.service';
import { RequestController } from './service-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestEntity } from './entities/service-request.entity';
import { UserModule } from '../../user/user.module'; 
import { RequestImageEntity } from '../../request-images/entities/request-image.entity'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([RequestEntity, RequestImageEntity]),
    UserModule,
  ],
  controllers: [RequestController],
  providers: [RequestService],
  exports: [RequestService],
})
export class ServiceRequestModule {}
