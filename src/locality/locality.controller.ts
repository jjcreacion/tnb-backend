import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from "@nestjs/common";
import {LocalityService} from "@/locality/locality.service";
import {CreateLocalityDto} from "@/locality/dto/createLocality.dto";
import {ReadLocalityDto} from "@/locality/dto/readLocality.dto";
import {ValidID} from "@/utils/validID";
import {UpdateLocalityDto} from "@/locality/dto/updateLocality.dto";

@Controller('country_city')
export class LocalityController {

  constructor(private readonly localityService: LocalityService) {}

  @Post()
  async create(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
      createLocalityDto: CreateLocalityDto
  ) {
    return this.localityService.create(createLocalityDto);
  }

  @Get("findAll")
  async findAll (): Promise<ReadLocalityDto[]> {
    return this.localityService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ReadLocalityDto> {
    return this.localityService.findOne(new ValidID(id));
  }

  @Delete()
  async remove (
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
      validID: ValidID
  ) {
    return this.localityService.remove(validID);
  }

  @Patch()
  async update (
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
      updateLocalityDto: UpdateLocalityDto
  ) {
    return this.localityService.update(updateLocalityDto);
  }
}