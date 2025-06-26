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
    UseInterceptors, 
    UploadedFiles,   
    HttpException,  
  } from '@nestjs/common';
  import { ValidID } from '@/utils/validID';
  import { UpdateRequestDto } from './dto/update-request.dt';
  import { ReadRequestDto } from './dto/read-request.dto';
  import { CreateRequestDto } from './dto/create-request.dto';
  import { UploadImagesDto } from './dto/uploadImagesDto';
  import { RequestService } from './service-request.service'; 
  import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger'; 
  import { FilesInterceptor } from '@nestjs/platform-express'; 
  import { diskStorage } from 'multer'; 
  import { extname, join } from 'path'; 

  
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

    @ApiOperation({ summary: 'Listado de solicitudes por Usuario' })
    @ApiResponse({ status: 200, description: 'Solicitudes encontradas.' })
    @ApiResponse({ status: 404, description: 'Solicitud no encontrada.' })
    @Get('user/:userId')
    async findAllByUser(@Param('userId', ParseIntPipe) userId: number): Promise<ReadRequestDto[]> {
      return this.requestService.findAllByUser(userId);
    }

    @Post(':requestId/upload-images') 
    @ApiOperation({ summary: 'Subir imágenes para una solicitud de servicio' })
    @ApiResponse({ status: 201, description: 'Imágenes cargadas exitosamente.' })
    @ApiResponse({ status: 400, description: 'Error al cargar las imágenes.' })
    @ApiConsumes('multipart/form-data') 
    @ApiBody({
      description: 'Archivos de imagen y ID de la solicitud',
      type: UploadImagesDto,
    })
    @UseInterceptors(
      FilesInterceptor('images', 10, { 
        storage: diskStorage({
          destination: (req, file, cb) => {
            const uploadPath = join(__dirname, '../../uploads'); 
            cb(null, uploadPath);
          },
          filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
          },
        }),
        fileFilter: (req, file, cb) => {
          if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Solo se permiten archivos de imagen (jpg, jpeg, png, gif)!'), false);
          }
          cb(null, true);
        },
      }),
    )
    async uploadImages(
      @Param('requestId', ParseIntPipe) requestId: number,
      @UploadedFiles() files: Array<Express.Multer.File>,
    ) {
      if (!files || files.length === 0) {
        throw new HttpException('No files uploaded', HttpStatus.BAD_REQUEST);
      }

       const imagePaths = files.map(file => file.path); 
      return this.requestService.saveRequestImages(requestId, imagePaths);
    }
}
 