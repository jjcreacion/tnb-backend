import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  ValidationPipe
} from '@nestjs/common';
import { RequestService } from '../services/request.service';
import { CreateRequestDto } from '../dto/createRequest.dto';
import {ReadRequestDto} from "@/request/dto/readRequests.dto";
import {FindRequestsByPersonDto} from "@/request/dto/findRequestByPerson.dto";
import {ValidID} from "@/utils/validID";

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post()
  create(@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) createRequestDto: CreateRequestDto) {
    return this.requestService.create(createRequestDto);
  }

  @Get('getByPerson')
  async findRequestsByPerson(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
          findPerson: ValidID
  ):Promise<ReadRequestDto[] | null> {
    return await this.requestService.findAllByPerson(findPerson);
  }



}
