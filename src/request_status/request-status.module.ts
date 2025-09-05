import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestStatusEntity } from './entities/request-status.entity';
import { RequestStatusService } from './request-status.service';
import { RequestStatusController } from './request-status.controller';
import { RequestEntity } from '@/app-mobile/service-requests/entities/service-request.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RequestStatusEntity, RequestEntity]),
  ],
  controllers: [RequestStatusController],
  providers: [RequestStatusService],
  exports: [RequestStatusService],
})
export class RequestStatusModule {}

