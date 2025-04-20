import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from "@nestjs/common";
import { ValidID } from "@/utils/validID";
import {CountryStateService} from "@/country-states/country-states.service";
import {CreateStateDto} from "@/country-states/dto/create-country-state.dto";
import {ReadStateDto} from "@/country-states/dto/read-country-state.dto";
import {UpdateStateDto} from "@/country-states/dto/update-country-state.dto";

@Controller('state')
export class CountryStateController {

  constructor(private readonly stateService: CountryStateService) {}

  @Post()
  async create(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
      createStateDto: CreateStateDto
  ) {
    return this.stateService.create(createStateDto);
  }

  @Get("findAll")
  async findAll (): Promise<ReadStateDto[]> {
    return this.stateService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ReadStateDto> {
    return this.stateService.findOne(new ValidID(id));
  }

  @Delete()
  async remove (@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) validID: ValidID) {
    return this.stateService.remove(validID);
  }

  @Patch()
  async update (
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
      updateStateDto: UpdateStateDto
  ) {
    return this.stateService.update(updateStateDto);
  }
}