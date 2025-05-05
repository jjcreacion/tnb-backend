import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  ParseIntPipe,
  HttpStatus
} from '@nestjs/common';
import { StatusInfoService } from './status-info.service';
import { CreateStatusInfoDto } from './dto/create-status-info.dto';
import { UpdateStatusInfoDto } from './dto/update-status-info.dto';
import {ReadStatusInfoDto} from "@/status-info/dto/read-status-info.dto";

@Controller('status-info')
export class StatusInfoController {
  constructor(private readonly statusInfoService: StatusInfoService) {}

  @Post()
  create(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
          dto: CreateStatusInfoDto
  ) {
    return this.statusInfoService.create(dto);
  }

  @Get('findAll')
  findAll(): Promise<ReadStatusInfoDto[]> {
    return this.statusInfoService.findAll();
  }

  @Get('findOne/:id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ReadStatusInfoDto> {
    return this.statusInfoService.findOne(id);
  }

  @Patch()
  update(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
          dto: UpdateStatusInfoDto
  ): Promise<{ message: string; status: HttpStatus; statusInfo: ReadStatusInfoDto | null }> {
    return this.statusInfoService.update(dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string; status: HttpStatus }> {
    return this.statusInfoService.remove(id);
  }
}
