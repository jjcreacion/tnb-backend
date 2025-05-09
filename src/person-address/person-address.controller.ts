import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { PersonAddressService } from './person-address.service';
import { CreatePersonAddressDto } from './dto/create-person-address.dto';
import { ReadPersonAddressDto } from "@/person-address/dto/read-person-address.dto";
import { UpdatePersonAddressDto } from './dto/update-person-address.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('person-address')
export class PersonAddressController {
  constructor(private readonly personAddressService: PersonAddressService) {}

  @ApiOperation({ summary: 'Crear Dirección Personal' })
  @ApiResponse({ status: 200, description: 'Registro Creado.' })
  @ApiResponse({ status: 404, description: 'Error al crear registro.' })
  @Post()
  create(@Body() createPersonAddressDto: CreatePersonAddressDto) {
    return this.personAddressService.create(createPersonAddressDto);
  }

  @ApiOperation({ summary: 'Listar direcciones' })
  @ApiResponse({ status: 200, description: 'Solicitud encontrada.' })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada.' })
  @Get()
  findAll() {
    return this.personAddressService.findAll();
  }

  @ApiOperation({ summary: 'Listar direcciones por ID' })
  @ApiResponse({ status: 200, description: 'Solicitud encontrada.' })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personAddressService.findOne(+id);
  }


  @ApiOperation({ summary: 'Buscar dirección por Id de Contacto' })
  @ApiResponse({ status: 200, description: 'Solicitud encontrada.' })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada.' })
  @Get('findByContact/:id')
  findByContact(@Param("id", ParseIntPipe) id: number): Promise<ReadPersonAddressDto> {
    return this.personAddressService.findOne(id);
  }

  @ApiOperation({ summary: 'Buscar dirección por Id de Persona'})
  @ApiResponse({ status: 200, description: 'Solicitud encontrada.' })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada.' })
  @Get('findByPerson/:id')
  findByPerson(@Param("id", ParseIntPipe) id: number): Promise<ReadPersonAddressDto[]> {
    return this.personAddressService.findByPerson(id);
  }
  
  @ApiOperation({ summary: 'Buscar dirección por Id de Usuario' })
  @ApiResponse({ status: 200, description: 'Solicitud encontrada.' })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada.' })
  @Get('findByUser/:id')
  findByUser(@Param("id", ParseIntPipe) id: number): Promise<ReadPersonAddressDto[]> {
    return this.personAddressService.findByUser(id);
  }
  

  @ApiOperation({ summary: 'Actualizar dirección ' })
  @ApiResponse({ status: 200, description: 'Solicitud encontrada.' })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada.' })
  @Patch()
  update(@Body() updatePersonAddressDto: UpdatePersonAddressDto) {
    return this.personAddressService.update(updatePersonAddressDto);
  }

  @ApiOperation({ summary: 'Eliminar dirección' })
  @ApiResponse({ status: 200, description: 'Solicitud encontrada.' })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personAddressService.remove(+id);
  }
}
