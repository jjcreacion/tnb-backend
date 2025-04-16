import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from "@nestjs/common";
import { CountryService } from "./country.service";
import { CreateCountryDto } from "./dto/createCountry.dto";
import { ReadCountryDto } from "./dto/readCountry.dto";
import { ValidID } from "@/utils/validID";
import { UpdateCountryDto } from "./dto/updateCountry.dto";

@Controller('country')
export class CountryController {

  constructor(private readonly countryService: CountryService) {}

  @Post()
  async create(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
      createCountryDto: CreateCountryDto
  ) {
    return this.countryService.create(createCountryDto);
  }

  @Get("findAll")
  async findAll (): Promise<ReadCountryDto[]> {
    return this.countryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ReadCountryDto> {
    return this.countryService.findOne(new ValidID(parseInt(id, 10)));
  }

  @Delete()
  async remove (
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
      validID: ValidID
  ) {
    return this.countryService.remove(validID);
  }

  @Patch()
  async update (
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
          updateCountryDto: UpdateCountryDto
  ) {
    return this.countryService.update(updateCountryDto);
  }
}