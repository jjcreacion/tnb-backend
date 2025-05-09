import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, ValidationPipe} from "@nestjs/common";
import {PersonEmailService} from "@/person-emails/person-emails.service";
import {CreatePersonEmailDto} from "@/person-emails/dto/create-person-email.dto";
import {ReadPersonEmailDto} from "@/person-emails/dto/read-person-email.dto";
import {UpdatePersonEmailDto} from "@/person-emails/dto/update-person-email.dto";
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('person-email')
export class PersonEmailController {
  constructor(private readonly personEmailService: PersonEmailService) {}

  @ApiOperation({ summary: 'Crear Email Personal' })
  @ApiResponse({ status: 200, description: 'Solicitud encontrada.' })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada.' })
  @Post()
  create(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
          dto: CreatePersonEmailDto
  ) {
    return this.personEmailService.create(dto);
  }

  @ApiOperation({ summary: 'Listar Email' })
  @ApiResponse({ status: 200, description: 'Solicitud encontrada.' })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada.' })
  @Get('findAll')
  findAll(): Promise<ReadPersonEmailDto[]> {
    return this.personEmailService.findAll();
  }

  @ApiOperation({ summary: 'Listar Email Personal por Id' })
  @ApiResponse({ status: 200, description: 'Solicitud encontrada.' })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada.' })
  @Get('findOne/:id')
  findOne(@Param("id", ParseIntPipe) id: number): Promise<ReadPersonEmailDto> {
    return this.personEmailService.findOne(id);
  }

  @ApiOperation({ summary: 'Buscar email por Id de Contacto' })
  @ApiResponse({ status: 200, description: 'Solicitud encontrada.' })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada.' })
  @Get('findByContact/:id')
  findByContact(@Param("id", ParseIntPipe) id: number): Promise<ReadPersonEmailDto> {
    return this.personEmailService.findOne(id);
  }

  @ApiOperation({ summary: 'Buscar email por Id de Persona'})
  @ApiResponse({ status: 200, description: 'Solicitud encontrada.' })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada.' })
  @Get('findByPerson/:id')
  findByPerson(@Param("id", ParseIntPipe) id: number): Promise<ReadPersonEmailDto[]> {
    return this.personEmailService.findByPerson(id);
  }
  
  @ApiOperation({ summary: 'Buscar email por Id de Usuario' })
  @ApiResponse({ status: 200, description: 'Solicitud encontrada.' })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada.' })
  @Get('findByUser/:id')
  findByUser(@Param("id", ParseIntPipe) id: number): Promise<ReadPersonEmailDto[]> {
    return this.personEmailService.findByUser(id);
  }

  @ApiOperation({ summary: 'Actualizar Email Personal ' })
  @ApiResponse({ status: 200, description: 'Solicitud procesada.' })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada.' })
  @Patch()
  update(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
          dto: UpdatePersonEmailDto
  ) {
    return this.personEmailService.update(dto);
  }

  @ApiOperation({ summary: 'Eliminar Email' })
  @ApiResponse({ status: 200, description: 'Email eliminado.' })
  @ApiResponse({ status: 404, description: 'Solicitud no procesada.' })
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.personEmailService.remove(id);
  }
}
