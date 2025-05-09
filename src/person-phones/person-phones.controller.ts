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
import {CreatePersonPhoneDto} from "@/person-phones/dto/create-person-phone.dto";
import {UpdatePersonAddressDto} from "@/person-address/dto/update-person-address.dto";
import {PersonPhoneService} from "@/person-phones/person-phones.service";
import {ReadPersonPhoneDto} from "@/person-phones/dto/read-person-phone.dto";
import {ValidID} from "@/utils/validID";
import {UpdatePersonPhoneDto} from "@/person-phones/dto/update-person-phone.dto";
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('person-phone')
export class PersonPhoneController {
  constructor(private readonly personPhoneService: PersonPhoneService) {}

  @ApiOperation({ summary: 'Crear Telefono Personal' })
  @ApiResponse({ status: 200, description: 'Solicitud encontrada.' })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada.' })
  @Post()
  create(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
          dto: CreatePersonPhoneDto
  ) {
    return this.personPhoneService.create(dto);
  }

  @ApiOperation({ summary: 'Listar numeros de telefonos' })
  @ApiResponse({ status: 200, description: 'Solicitud encontrada.' })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada.' })
  @Get('findAll')
  findAll(): Promise<ReadPersonPhoneDto[]> {
    return this.personPhoneService.findAll();
  }

  @ApiOperation({ summary: 'Listar numeros de telefono por ID' })
  @ApiResponse({ status: 200, description: 'Solicitud encontrada.' })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada.' })
  @Get('findOne/:id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ReadPersonPhoneDto> {
    return this.personPhoneService.findOne(new ValidID(id));
  }

  @ApiOperation({ summary: 'Buscar telefono por Id de Contacto' })
  @ApiResponse({ status: 200, description: 'Solicitud encontrada.' })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada.' })
  @Get('findByContact/:id')
  findByContact(@Param("id", ParseIntPipe) id: number): Promise<ReadPersonPhoneDto> {
    return this.personPhoneService.findOne(new ValidID(id));
  }

  @ApiOperation({ summary: 'Buscar telefono por Id de Persona'})
  @ApiResponse({ status: 200, description: 'Solicitud encontrada.' })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada.' })
  @Get('findByPerson/:id')
  findByPerson(@Param("id", ParseIntPipe) id: number): Promise<ReadPersonPhoneDto[]> {
    return this.personPhoneService.findByPerson(id);
  }
  
  @ApiOperation({ summary: 'Buscar telefono por Id de Usuario' })
  @ApiResponse({ status: 200, description: 'Solicitud encontrada.' })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada.' })
  @Get('findByUser/:id')
  findByUser(@Param("id", ParseIntPipe) id: number): Promise<ReadPersonPhoneDto[]> {
    return this.personPhoneService.findByUser(id);
  }

  @ApiOperation({ summary: 'Actualizar números de telefonos' })
  @ApiResponse({ status: 200, description: 'Solicitud encontrada.' })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada.' })
  @Patch()
  update(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
          dto: UpdatePersonPhoneDto
  ): Promise<{ message: string; status: HttpStatus; phone: ReadPersonPhoneDto | null }> {
    return this.personPhoneService.update(dto);
  }

  @ApiOperation({ summary: 'Eliminar números de telefonos' })
  @ApiResponse({ status: 200, description: 'Solicitud encontrada.' })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada.' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string; status: HttpStatus }> {
    return this.personPhoneService.remove(id);
  }
}
