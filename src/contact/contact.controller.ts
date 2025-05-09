import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { ReadContactDto } from "@/contact/dto/read-contact.dto";
import { UpdateContactDto } from './dto/update-contact.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('Contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @ApiOperation({ summary: 'Crear Contacto' })
  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }

  @ApiOperation({ summary: 'Listar contactos' })
  @Get('findAll')
  findAll() {
    return this.contactService.findAll();
  }

  @ApiOperation({ summary: 'Listar contactos por ID' })
  @Get('findOne/:id')
  findOne(@Param('id') id: string) {
    return this.contactService.findOne(+id);
  }

  @ApiOperation({ summary: 'Actualizar Contacto ' })
  @Patch()
  update(@Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(updateContactDto);
  }

  @ApiOperation({ summary: 'Eliminar contacto' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactService.remove(+id);
  }
}
