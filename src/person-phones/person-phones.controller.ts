import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  ParseIntPipe,
  HttpStatus
} from '@nestjs/common';
import {PersonAddressService} from "@/person-address/person-address.service";
import {CreatePersonAddressDto} from "@/person-address/dto/create-person-address.dto";
import {ReadPersonAddressDto} from "@/person-address/dto/read-person-address.dto";
import {UpdatePersonAddressDto} from "@/person-address/dto/update-person-address.dto";
import {PersonPhoneService} from "@/person-phones/person-phones.service";
import {ReadPersonPhoneDto} from "@/person-phones/dto/read-person-phone.dto";
import {ValidID} from "@/utils/validID";
import {UpdatePersonPhoneDto} from "@/person-phones/dto/update-person-phone.dto";
@Controller('person-address')
export class PersonPhoneController {
  constructor(private readonly personPhoneService: PersonPhoneService) {}

  @Post()
  create(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
          dto: CreatePersonAddressDto
  ) {
    return this.personPhoneService.create(dto);
  }

  @Get('findAll')
  findAll(): Promise<ReadPersonPhoneDto[]> {
    return this.personPhoneService.findAll();
  }

  @Get('findOne/:id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ReadPersonPhoneDto> {
    return this.personPhoneService.findOne(new ValidID(id));
  }

  @Patch()
  update(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
          dto: UpdatePersonPhoneDto
  ): Promise<{ message: string; status: HttpStatus; phone: ReadPersonPhoneDto | null }> {
    return this.personPhoneService.update(dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string; status: HttpStatus }> {
    return this.personPhoneService.remove(id);
  }
}
