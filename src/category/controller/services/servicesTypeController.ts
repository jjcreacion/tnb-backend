import {Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe} from '@nestjs/common';
import {ServicesTypeService} from "@/category/service/services/servicesType.service";
import {ReadServicesTypeDto} from "@/category/dto/services/readServicesType.dto";
import {ValidID} from "@/utils/validID";
import {UpdateServicesTypeDto} from "@/category/dto/services/updateServicesType.dto";
import {CreateServicesTypeDto} from "@/category/dto/services/createServicesType.dto";

@Controller('servicestype')
export class ServicesTypeController {

  constructor(private readonly servicesTypeService: ServicesTypeService) {}

  @Post()
  async create(@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) createServicesTypeDto: CreateServicesTypeDto) {
    return this.servicesTypeService.create(createServicesTypeDto);
  }

  @Get("findAll")
  async findAll (): Promise<ReadServicesTypeDto[]> {
    return this.servicesTypeService.findAll();
  }

  @Get(':id')
  async findOne(@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) validID: ValidID): Promise<ReadServicesTypeDto> {
    return this.servicesTypeService.findOne(validID);
  }

  @Delete()
  async remove (@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) validID: ValidID) {
    return this.servicesTypeService.remove(validID);
  }

  @Patch()
  async update (@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) updateServicesTypeDto: UpdateServicesTypeDto) {
    return this.servicesTypeService.update(updateServicesTypeDto);
  }
}
