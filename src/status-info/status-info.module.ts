import { Module } from '@nestjs/common';
import { StatusInfoService } from './status-info.service';
import { StatusInfoController } from './status-info.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {StatusInfoEntity} from "@/status-info/entities/status-info.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([StatusInfoEntity]),
  ],
  controllers: [StatusInfoController],
  providers: [StatusInfoService],
  exports:[StatusInfoService]
})
export class StatusInfoModule {}
