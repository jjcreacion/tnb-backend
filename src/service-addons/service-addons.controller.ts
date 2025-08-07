import {Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe} from '@nestjs/common';
import {ValidID} from "@/utils/validID";
import {UpdateAddonsDto} from "@/service-addons/dto/update-addons.dto";
import {ServiceAddonService} from "@/service-addons/service-addons.service";
import {CreateAddonsDto} from "@/service-addons/dto/create-addons.dto";
import {ReadAddonsDto} from "@/service-addons/dto/read-addons.dto";

@Controller('serviceAddon')
export class ServiceAddonController {

  constructor(private readonly serviceAddonService: ServiceAddonService) {}
/*
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

  @Get('findOne/:id')
  async findOne(
      @Param("id",ParseIntPipe) id :number
  ): Promise<ReadAddonsDto> {
    return this.serviceAddonService.findOne(new ValidID(id));
  }

  @Delete(":id")
  async remove (
      @Param("id",ParseIntPipe) id :number
  ) {
    return this.serviceAddonService.remove(new ValidID(id));
  }

  @Patch()
  async update (
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
          updateServiceAddonDto: UpdateAddonsDto
  ) {
    return this.serviceAddonService.update(updateServiceAddonDto);
  }


  @Get("getAllByService/:pkService")
  async findByService(@Param("pkService",ParseIntPipe) pkService : number){
    return this.serviceAddonService.findOAllByService(pkService)
  }*/
}