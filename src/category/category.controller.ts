import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  HttpStatus,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  HttpException,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import {ValidID} from "@/utils/validID";
import {CreateCategoryDto} from "@/category/dto/create-category.dto";
import {ReadCategoryDto} from "@/category/dto/read-category.dto";
import {UpdateCategoryDto} from "@/category/dto/update-category.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadImageDto } from './dto/uploadImagen.dto';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
      createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get('findAll')
  async findAll(): Promise<ReadCategoryDto[]> {
    return this.categoryService.findAll();
  }

  @Get('findAllWithChildrens')
  async findAllWithChildrens(): Promise<ReadCategoryDto[]> {
    return this.categoryService.findAllWithChildrens();
  }


  @Get('findOne/:id')
  async findOne(
      @Param("id") id : number
  ): Promise<ReadCategoryDto> {
    return this.categoryService.findOne(new ValidID(id));
  }

  @Patch()
  async update(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
      updateCategoryDto: UpdateCategoryDto
  ):Promise<{ message: string; status: HttpStatus; category: ReadCategoryDto | null }> {
    return this.categoryService.update(updateCategoryDto);
  }

  @Delete(":id")
  async remove(
      @Param("id",ParseIntPipe) id: number

  ):Promise<{ message: string, status: HttpStatus }> {
    return this.categoryService.remove(id);
  }

  @Post('upload-image/:categoryId')
  @ApiOperation({ summary: 'Subir una imagen para la categoria' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Archivo de imagen para la campaña. Se actualizará el campo `imageUrl` de la campaña.',
    type: UploadImageDto,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = join(__dirname, '../../../images/category');
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileName = `category-${uniqueSuffix}${extname(file.originalname)}`;
          cb(null, fileName);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
          return cb(new HttpException('Solo se permiten archivos de imagen (jpg, jpeg, png, gif, webp)!', HttpStatus.BAD_REQUEST), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadImage(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ReadCategoryDto> {
    if (!file) {
      throw new HttpException('No se ha subido ningún archivo.', HttpStatus.BAD_REQUEST);
    }

    const imageUrl = `/images/category/${file.filename}`;

    return this.categoryService.updateCategoryImageUrl(categoryId, imageUrl);
  }
}
