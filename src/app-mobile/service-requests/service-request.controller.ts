import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    HttpStatus,
    Post,
    ValidationPipe,
  } from '@nestjs/common';
  import { ValidID } from '@/utils/validID';
  import { UpdateRequestDto } from './dto/update-request.dt';
  import { ReadRequestDto } from './dto/read-request.dto';
  import { CreateRequestDto } from './dto/create-request.dto';
  import { RequestService } from './service-request.service'; 
  import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
  
  @ApiTags('Services-requests')
  @Controller('service_request')
  export class RequestController {
    constructor(private readonly requestService: RequestService) {}
      
    @Post()
    @ApiOperation({ summary: 'Crear una nueva solicitud' }) 
    @ApiResponse({ status: 201, description: 'Solicitud creada exitosamente.' }) 
    async create(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
      createRequestDto: CreateRequestDto,
    ) {
      return this.requestService.create(createRequestDto);
    }
  
    @ApiOperation({ summary: 'Obtener todas las solicitudes' })
    @ApiResponse({ status: 200, description: 'Lista de todas las solicitudes.' })
    @Get('findAll')
    async findAll(): Promise<ReadRequestDto[]> {
      return this.requestService.findAll();
    }
  
    @ApiOperation({ summary: 'Obtener una solicitud por ID' })
    @ApiResponse({ status: 200, description: 'Solicitud encontrada.' })
    @ApiResponse({ status: 404, description: 'Solicitud no encontrada.' })
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<ReadRequestDto> {
      return this.requestService.findOne(new ValidID(id));
    }
  
    @ApiOperation({ summary: 'Actualizar una solicitud' })
    @ApiResponse({ status: 200, description: 'Solicitud actualizada exitosamente.' })
    @ApiResponse({ status: 404, description: 'Solicitud no encontrada.' })
    @Patch()
    async update(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
      updateRequestDto: UpdateRequestDto,
    ) {
      return this.requestService.update(updateRequestDto);
    }
    
    @ApiOperation({ summary: 'Eliminar una solicitud por ID' })
    @ApiResponse({ status: 200, description: 'Solicitud eliminada exitosamente.' })
    @ApiResponse({ status: 404, description: 'Solicitud no encontrada.' })
    @Delete(":id")
    async remove(@Param("id",ParseIntPipe) id: number
    ):Promise<{ message: string, status: HttpStatus }> {
      return this.requestService.remove(id);
    }

    @Get('user/:userId')
    async findAllByUser(@Param('userId', ParseIntPipe) userId: number): Promise<ReadRequestDto[]> {
      return this.requestService.findAllByUser(userId);
    }
   
  }
