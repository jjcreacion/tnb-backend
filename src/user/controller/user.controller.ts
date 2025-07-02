import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  ValidationPipe,
  Param,
  HttpStatus,
  Query,
  HttpException,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
  NotFoundException
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserWithEmailDto } from '../dto/createUserWithEmail.dto';
import { VerifyEmailDto } from '../dto/verifyEmail.dto';
import { ReadUserDto } from '@/user/dto/readUser.dto';
import { UploadProfileImageDto } from '../dto/UploadProfileImageDto';
import { ValidEmailDto } from '@/user/dto/validEmail.dto';
import { ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { LoginWithEmailDto } from '../dto/loginWithEmail.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'; 
import { extname, join } from 'path'; 
import { UpdateUserProfileDto } from '../dto/updateUserProfile.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Crear Usuario Por Email' })
  @Post('createWithEmail')
  create(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
      createUserWithEmailDto: CreateUserWithEmailDto
  ): Promise<ReadUserDto> {
    return this.userService.createWithEmail(createUserWithEmailDto);
  }

  @ApiOperation({ summary: 'Lista Completa de Usuarios ' })
  @Get('findAll')
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Listar usuario por Id' })
  @Get('findOne/:id')
  async findOne(@Param("id") id : number) : Promise<ReadUserDto> {
    const responseDto = await this.userService.findOneBy(id);
    return responseDto;
  }

  @ApiOperation({ summary: 'Verificar si el usuario existe por email y password' })
  @Get('verifyUserWithEmail')
  verifyUserWithEmail(
    @Query(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) validParameter: ValidEmailDto
  ): Promise<{ exists: boolean, status: HttpStatus, pkUser?: number }> {
    return this.userService.verifyUserWithEmail(validParameter);
  }

  @ApiOperation({ summary: 'Verificar si el email existe' })
  @Get('verifyEmail')
  async verifyEmailExists(
    @Query(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) validEmailDto: VerifyEmailDto
  ): Promise<{ exists: boolean }> {
    const exists = await this.userService.verifyEmail(validEmailDto.email);
    return { exists };
  }
 
  @ApiOperation({ summary: 'Editar datos de usuario (sin actualizar email si no se proporciona)' })
  @Patch('updateUserProfile')
  async update(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true })) 
    updateUserProfileDto: UpdateUserProfileDto,
  ): Promise<ReadUserDto> {
    try {
      const updatedUser = await this.userService.updateUser(updateUserProfileDto);
      return updatedUser;
    } catch (error) {
      if (error instanceof HttpException) { 
        throw error; 
      }
      throw new HttpException(
        'Error al actualizar el usuario: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  
  @ApiOperation({ summary: 'Subir imagen de perfil de usuario' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        pkUser: {
          type: 'number',
          description: 'El ID del usuario.',
        },
        file: {
          type: 'string',
          format: 'binary',
          description: 'La imagen de perfil a subir.',
        },
      },
      required: ['pkUser', 'file'], 
    },
  })
  @Post('upload-profile-image') 
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(__dirname, '../../../../images/profiles'),
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(new HttpException('Solo se permiten archivos de imagen!', HttpStatus.BAD_REQUEST), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, 
      },
    })
  )
  async uploadProfileImage(
    @Body(new ValidationPipe({ transform: true })) body: UploadProfileImageDto, 
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ message: string; filePath?: string }> {
    const pkUser = body.pkUser;

    if (!file) {
      throw new HttpException('No se ha subido ningún archivo.', HttpStatus.BAD_REQUEST);
    }

    if (typeof pkUser !== 'number' || pkUser <= 0 || pkUser > 1000000) {
      throw new HttpException('ID de usuario inválido o fuera de rango.', HttpStatus.BAD_REQUEST);
    }

    try {
      const relativePath = `images/profiles/${file.filename}`;
      await this.userService.updateProfileImagePath(pkUser, relativePath);

      return {
        message: 'Imagen de perfil subida exitosamente.',
        filePath: relativePath,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error al subir la imagen de perfil: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

}