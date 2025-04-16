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
import {ReadRequestByTableDto, ReadRequestDto} from "@/request/dto/readRequests.dto";
import {FindRequestsByPersonDto} from "@/request/dto/findRequestByPerson.dto";
import {ValidID} from "@/utils/validID";

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post()
  async create(@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) createRequestDto: CreateRequestDto) {
    return this.requestService.create(createRequestDto);
  }

  @Get('getByPerson/:idPerson')
  async findRequestsByPerson(
          @Param("idPerson")idPerson : number
  ):Promise<ReadRequestDto[] | null> {
    return await this.requestService.findAllByPerson(new ValidID(idPerson));
  }

  @Get('AllbyAdmin')
  async findAllRequestByAdmin():Promise<ReadRequestDto[]>{
    return this.requestService.findAllRequestByAdmin();
  }

  @Get('forTableList')
  async findAllforTableList():Promise<ReadRequestByTableDto[]>{
    return this.requestService.findAllRequestforTableList();
  }

}
