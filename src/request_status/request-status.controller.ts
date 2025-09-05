import {
    Body,
    Controller,
    Post,
    Get,
    ValidationPipe,
    Param,
    ParseIntPipe,
  } from '@nestjs/common';
  import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
  import { CreateRequestStatusDto } from './dto/create-request-status.dto';
  import { ReadRequestStatusDto } from './dto/read-request-status.dto';
  import { RequestStatusService } from './request-status.service';
  
  @ApiTags('Request Status')
  @Controller('request-status')
  export class RequestStatusController {
    constructor(private readonly requestStatusService: RequestStatusService) {}
  
    @Post()
    @ApiOperation({ summary: 'Crear un nuevo registro de estado para una solicitud' })
    @ApiResponse({
      status: 201,
      description: 'Registro de estado creado y solicitud actualizada exitosamente.',
      type: ReadRequestStatusDto,
    })
    @ApiResponse({ status: 400, description: 'Datos inválidos.' })
    @ApiResponse({ status: 404, description: 'Solicitud no encontrada.' })
    async create(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
      createRequestStatusDto: CreateRequestStatusDto,
    ): Promise<ReadRequestStatusDto> {
      return this.requestStatusService.create(createRequestStatusDto);
    }

    @Get('history/:requestId')
    @ApiOperation({
      summary: 'Obtener el historial de estados de una solicitud de servicio',
    })
    @ApiResponse({
      status: 200,
      description: 'Historial de estados de la solicitud.',
      type: [ReadRequestStatusDto],
    })

    @ApiResponse({ status: 404, description: 'Solicitud de servicio no encontrada.' })
    async findAllByRequestId(
      @Param('requestId', ParseIntPipe) requestId: number,
    ): Promise<ReadRequestStatusDto[]> {
      return this.requestStatusService.findAllByRequestId(requestId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un registro de estado por su ID' })
    @ApiResponse({
      status: 200,
      description: 'Registro de estado encontrado.',
      type: ReadRequestStatusDto,
    })
    @ApiResponse({ status: 404, description: 'Registro de estado no encontrado.' })
    async findOne(
      @Param('id', ParseIntPipe) id: number,
    ): Promise<ReadRequestStatusDto> {
      return this.requestStatusService.findOne(id);
    }

  }
  
  