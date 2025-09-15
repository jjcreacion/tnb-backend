import {
    Controller,
    Get,
    Param,
    ParseIntPipe,
    HttpStatus,
  } from '@nestjs/common';
  import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
  import { RequestImagesService } from './request-images.service';
  import { ReadRequestImageDto } from './dto/read-request-image.dto';
  
  @ApiTags('Request Images')
  @Controller('request-images')
  export class RequestImagesController {
    constructor(private readonly requestImagesService: RequestImagesService) {}
  
    @Get('by-request/:requestId')
    @ApiOperation({
      summary: 'Obtener todas las imágenes asociadas a una solicitud de servicio',
    })
    @ApiParam({
      name: 'requestId',
      description: 'ID de la solicitud de servicio (fk_request)',
      type: 'number',
      example: 1,
    })
    @ApiResponse({
      status: HttpStatus.OK,
      description: 'Lista de imágenes de la solicitud.',
      type: [ReadRequestImageDto],
    })
    async findAllByRequestId(
      @Param('requestId', ParseIntPipe) requestId: number,
    ): Promise<ReadRequestImageDto[]> {
      return this.requestImagesService.findAllByRequestId(requestId);
    }
  }
  
  