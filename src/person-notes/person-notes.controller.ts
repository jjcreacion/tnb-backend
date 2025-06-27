import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, ValidationPipe} from "@nestjs/common";
import {PersonNotesService} from "@/person-notes/person-notes.service";
import {CreatePersonNoteDto} from "@/person-notes/dto/create-person-note.dto";
import {ReadPersonNoteDto} from "@/person-notes/dto/read-person-note.dto";
import {UpdatePersonNoteDto} from "@/person-notes/dto/update-person-note.dto";
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('person-notes')
export class PersonNotesController {
  constructor(private readonly personNotesService: PersonNotesService) {}

  @ApiOperation({ summary: 'Crear Nota Personal' })
  @ApiResponse({ status: 200, description: 'Nota creada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Error al crear la nota.' })
  @Post()
  create(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
          dto: CreatePersonNoteDto
  ) {
    return this.personNotesService.create(dto);
  }

  @ApiOperation({ summary: 'Listar todas las Notas' })
  @ApiResponse({ status: 200, description: 'Notas encontradas.' })
  @ApiResponse({ status: 404, description: 'No se encontraron notas.' })
  @Get('findAll')
  findAll(): Promise<ReadPersonNoteDto[]> {
    return this.personNotesService.findAll();
  }

  @ApiOperation({ summary: 'Buscar Nota por Id' })
  @ApiResponse({ status: 200, description: 'Nota encontrada.' })
  @ApiResponse({ status: 404, description: 'Nota no encontrada.' })
  @Get('findOne/:id')
  findOne(@Param("id", ParseIntPipe) id: number): Promise<ReadPersonNoteDto> {
    return this.personNotesService.findOne(id);
  }

  @ApiOperation({ summary: 'Buscar notas por Id de Contacto'})
  @ApiResponse({ status: 200, description: 'Notas encontradas.' })
  @ApiResponse({ status: 404, description: 'No se encontraron notas para este contacto.' })
  @Get('findByContact/:id')
  findByContact(@Param("id", ParseIntPipe) id: number): Promise<ReadPersonNoteDto[]> {
    return this.personNotesService.findByContact(id);
  }
  
  @ApiOperation({ summary: 'Buscar notas por Id de Usuario' })
  @ApiResponse({ status: 200, description: 'Notas encontradas.' })
  @ApiResponse({ status: 404, description: 'No se encontraron notas para este usuario.' })
  @Get('findByUser/:id')
  findByUser(@Param("id", ParseIntPipe) id: number): Promise<ReadPersonNoteDto[]> {
    return this.personNotesService.findByUser(id);
  }

  @ApiOperation({ summary: 'Buscar notas prioritarias' })
  @ApiResponse({ status: 200, description: 'Notas prioritarias encontradas.' })
  @ApiResponse({ status: 404, description: 'No se encontraron notas prioritarias.' })
  @Get('findPriority')
  findPriority(): Promise<ReadPersonNoteDto[]> {
    return this.personNotesService.findPriority();
  }

  @ApiOperation({ summary: 'Actualizar Nota Personal' })
  @ApiResponse({ status: 200, description: 'Nota actualizada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Nota no encontrada.' })
  @Patch()
  update(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
          dto: UpdatePersonNoteDto
  ) {
    return this.personNotesService.update(dto);
  }

  @ApiOperation({ summary: 'Eliminar Nota' })
  @ApiResponse({ status: 200, description: 'Nota eliminada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Nota no encontrada.' })
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.personNotesService.remove(id);
  }
}