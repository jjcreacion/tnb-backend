import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { StatusListController } from "@/status_list/status-list.controller";
import { StatusListService } from "@/status_list/status-list.service";
import { StatusListEntity } from "@/status_list/entities/status-list.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([StatusListEntity]),
  ],
  controllers: [StatusListController],
  providers: [StatusListService],
  exports: [StatusListService]
})
export class StatusListModule {}
