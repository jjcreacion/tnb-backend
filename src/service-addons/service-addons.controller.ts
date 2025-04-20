import {Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe} from '@nestjs/common';
import {ValidID} from "@/utils/validID";
import {UpdateAddonsDto} from "@/service-addons/dto/update-addons.dto";
import {ServiceAddonService} from "@/service-addons/service-addons.service";
import {CreateAddonsDto} from "@/service-addons/dto/create-addons.dto";
import {ReadAddonsDto} from "@/service-addons/dto/read-addons.dto";

@Controller('serviceAddon')
export class ServiceAddonController {

  constructor(private readonly serviceAddonService: ServiceAddonService) {}

  @Post()
  async create(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
          createServiceAddonDto: CreateAddonsDto
  ) {
    return this.serviceAddonService.create(createServiceAddonDto);
  }

  @Get("findAll")
  async findAll (): Promise<ReadAddonsDto[]> {
    return this.serviceAddonService.findAll();
  }

  @Get('findOne')
  async findOne(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
      validID: ValidID
  ): Promise<ReadAddonsDto> {
    return this.serviceAddonService.findOne(validID);
  }

  @Delete()
  async remove (
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
      validID: ValidID
  ) {
    return this.serviceAddonService.remove(validID);
  }

  @Patch()
  async update (
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
          updateServiceAddonDto: UpdateAddonsDto
  ) {
    return this.serviceAddonService.update(updateServiceAddonDto);
  }
}