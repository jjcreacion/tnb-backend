import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from "@nestjs/common";
import { ValidID } from "@/utils/validID";
import {LocalityTypeService} from "@/locality-type/localityType.service";
import {CreateLocalityTypeDto} from "@/locality-type/dto/createLocalityType.dto";
import {ReadLocalityTypeDto} from "@/locality-type/dto/readLocalityType.dto";
import {UpdateLocalityTypeDto} from "@/locality-type/dto/updateLocalityType.dto";
@Controller('localityType')
export class LocalityTypeController {

  constructor(private readonly localityTypeService: LocalityTypeService) {}

  @Post()
  async create(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
      createLocalityTypeDto: CreateLocalityTypeDto
  ) {
    return this.localityTypeService.create(createLocalityTypeDto);
  }

  @Get("findAll")
  async findAll (): Promise<ReadLocalityTypeDto[]> {
    return this.localityTypeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ReadLocalityTypeDto> {
    return this.localityTypeService.findOne(new ValidID(id));
  }

  @Delete()
  async remove (@Body(new ValidationPipe({
    whitelist: true, forbidNonWhitelisted: true }))
    validID: ValidID
  ) {
    return this.localityTypeService.remove(validID);
  }

  @Patch()
  async update (
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
      updateLocalityTypeDto: UpdateLocalityTypeDto
  ) {
    return this.localityTypeService.update(updateLocalityTypeDto);
  }
}