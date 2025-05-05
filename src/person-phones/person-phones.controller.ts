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
@Controller('person-address')
export class PersonAddressController {
  constructor(private readonly personAddressService: PersonAddressService) {}

  @Post()
  create(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
          dto: CreatePersonAddressDto
  ) {
    return this.personAddressService.create(dto);
  }

  @Get('findAll')
  findAll(): Promise<ReadPersonAddressDto[]> {
    return this.personAddressService.findAll();
  }

  @Get('findOne/:id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ReadPersonAddressDto> {
    return this.personAddressService.findOne(id);
  }

  @Patch()
  update(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
          dto: UpdatePersonAddressDto
  ): Promise<{ message: string; status: HttpStatus; address: ReadPersonAddressDto | null }> {
    return this.personAddressService.update(dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string; status: HttpStatus }> {
    return this.personAddressService.remove(id);
  }
}
