import {Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe} from '@nestjs/common';
import {ClientTypeService} from "@/clientType/service/clientType.service";
import {ReadClientTypeDto} from "@/clientType/dto/readClientType.dto";
import {CreateClientTypeDto} from "@/clientType/dto/createClientType.dto";
import {ValidID} from "@/utils/validID";
import {UpdateClientTypeDto} from "@/clientType/dto/updateClientType";

@Controller('clientType')
export class ClientTypeController {

  constructor(private readonly clientTypeService: ClientTypeService) {}

  @Post()
  async create(@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) createClientTypeDto: CreateClientTypeDto) {
    return this.clientTypeService.create(createClientTypeDto);
  }

  @Get("findAll")
  async findAll (): Promise<ReadClientTypeDto[]> {
    return this.clientTypeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ReadClientTypeDto> {
    return this.clientTypeService.findOne(new ValidID(parseInt(id, 10)));
  }

  @Delete()
  async remove (@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) validID: ValidID) {
    return this.clientTypeService.remove(validID);
  }

  @Patch()
  async update (@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) updateClientTypeDto: UpdateClientTypeDto) {
    return this.clientTypeService.update(updateClientTypeDto);
  }
}
