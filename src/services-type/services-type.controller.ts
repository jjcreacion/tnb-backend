import {Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe} from '@nestjs/common';
import {ValidID} from "@/utils/validID";
import {ReadServicesTypeDto} from "@/services-type/dto/read-services-type.dto";
import {ServicesTypeService} from "@/services-type/services-type.service";
import {UpdateServicesTypeDto} from "@/services-type/dto/update-services-type.dto";
import {CreateServicesTypeDto} from "@/services-type/dto/create-services-type.dto";

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
