import {Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/createPerson.dto';
import { UpdatePersonDto } from './dto/updatePerson.dto';
import {ReadPersonDto} from "@/person/dto/readPerson.dto";
import {ValidID} from "@/utils/validID";
import {PersonMapper} from "@/person/mapper/person.mapper";
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('person')
export class PersonController {
  constructor(
      private readonly personService: PersonService,
  ) {}

  @ApiOperation({ summary: 'Crear registro persona' })
  @ApiResponse({ status: 200, description: 'Registro Creado.' })
  @ApiResponse({ status: 404, description: 'Error al crear registro.' })
  @Post()
  async create(@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
             createPersonDto: CreatePersonDto) {
    return await this.personService.create(createPersonDto);
  }

  @ApiOperation({ summary: 'Lista de personas completa' })
  @ApiResponse({ status: 200, description: 'Registro listado.' })
  @ApiResponse({ status: 404, description: 'Error al listar registros.' })
  @Get('findAll')
  async findAll(): Promise<ReadPersonDto[]> {
    return await this.personService.findAll();
  }

  @ApiOperation({ summary: 'Listar persona por Id' })
  @ApiResponse({ status: 200, description: 'Registro listado.' })
  @ApiResponse({ status: 404, description: 'Error al listar registros.' })
  @Get('findOne/:id')
  async findOne(@Param("id") id : number) : Promise<ReadPersonDto> {
    const responseEntity = await this.personService.findOneBy(new ValidID(id));

    const responseDto = PersonMapper.entityToReadPersonDto(
        responseEntity
    );
    return responseDto;
  }
  
  @ApiOperation({ summary: 'Actualizar persona' })
  @ApiResponse({ status: 200, description: 'Registro Actualizado.' })
  @ApiResponse({ status: 404, description: 'Error al actualizar registros.' })
  @Patch()
  async update(@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
                   updatePersonDto: UpdatePersonDto) {
    return await this.personService.update(updatePersonDto);
  }

  @ApiOperation({ summary: 'Eliminar persona' })
  @ApiResponse({ status: 200, description: 'Persona eliminada.' })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }
}
