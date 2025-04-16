import {Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe} from '@nestjs/common';
import {ServiceAddonService} from "@/category/service/services/serviceAddons.service";
import {ReadServiceAddonDto} from "@/category/dto/services/readServiceAddon.dto";
import {ValidID} from "@/utils/validID";
import {CreateServiceAddonDto} from "@/category/dto/services/createServiceAddon.dto";
import {UpdateServiceAddonDto} from "@/category/dto/services/updateServiceAddon.dto";

@Controller('serviceAddon')
export class ServiceAddonController {

  constructor(private readonly serviceAddonService: ServiceAddonService) {}

  @Post()
  async create(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
          createServiceAddonDto: CreateServiceAddonDto
  ) {
    return this.serviceAddonService.create(createServiceAddonDto);
  }

  @Get("findAll")
  async findAll (): Promise<ReadServiceAddonDto[]> {
    return this.serviceAddonService.findAll();
  }

  @Get('findOne')
  async findOne(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
      validID: ValidID
  ): Promise<ReadServiceAddonDto> {
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
          updateServiceAddonDto: UpdateServiceAddonDto
  ) {
    return this.serviceAddonService.update(updateServiceAddonDto);
  }
}