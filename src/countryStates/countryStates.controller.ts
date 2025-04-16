import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from "@nestjs/common";
import { ValidID } from "@/utils/validID";
import {CreateStateDto} from "@/countryStates/dto/createCountryState.dto";
import {CountryStateService} from "@/countryStates/countryStates.service";
import {ReadStateDto} from "@/countryStates/dto/readCountryState.dto";
import {UpdateStateDto} from "@/countryStates/dto/updateCountryState.dto";

@Controller('state')
export class StateController {

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