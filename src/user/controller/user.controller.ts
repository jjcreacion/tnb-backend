import { ReadUserDto } from '@/user/dto/readUser.dto';
import { ValidEmailDto } from '@/user/dto/validEmail.dto';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Public } from '../../auth/guard/public.decorators';
import { CreateUserDto } from '../dto/createUser.dto';
import { CreateUserWithEmailDto } from '../dto/createUserWithEmail.dto';
import { LoginWithEmailDto } from '../dto/loginWithEmail.dto';
import { ResetPasswordDto } from '../dto/resetPassword.dto';
import { UpdateUserProfileDto } from '../dto/updateUserProfile.dto';
import { UploadProfileImageDto } from '../dto/UploadProfileImageDto';
import { VerifyEmailDto } from '../dto/verifyEmail.dto';
import { UserService } from '../service/user.service';

// @Roles(Role.ADMIN)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @ApiOperation({ summary: 'Crear Usuario' })
  @Post('create')
  create(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    createUserDto: CreateUserDto,
  ): Promise<ReadUserDto> {
    return this.userService.create(createUserDto);
  }

  @Public()
  @ApiOperation({ summary: 'Crear Usuario Por Email' })
  @Post('createWithEmail')
  createWithEmail(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    createUserWithEmailDto: CreateUserWithEmailDto,
  ): Promise<ReadUserDto> {
    return this.userService.createWithEmail(createUserWithEmailDto);
  }

  @ApiOperation({ summary: 'Lista Completa de Usuarios ' })
  // @Public()
  @Get('findAll')
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Listar usuario por Id' })
  @Get('findOne/:id')
  async findOne(@Param('id') id: number): Promise<ReadUserDto> {
    const responseDto = await this.userService.findOneBy(id);
    return responseDto;
  }

  @Public()
  @ApiOperation({
    summary: 'Verificar si el usuario existe por email y password',
  })
  @Get('verifyUserWithEmail')
  verifyUserWithEmail(
    @Query(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    validParameter: ValidEmailDto,
  ): Promise<{ exists: boolean; status: HttpStatus; pkUser?: number }> {
    return this.userService.verifyUserWithEmail(validParameter);
  }

  @Public()
  @ApiOperation({ summary: 'Login por Email' })
  @Post('loginWithEmail')
  async login(
    @Body(new ValidationPipe()) loginDto: LoginWithEmailDto,
  ): Promise<{ accessToken: string; pkUser: number; roles?: string[] }> {
    const user = await this.userService.findByEmail(loginDto.email);

    if (!user) {
      throw new HttpException(
        'Credenciales inválidas',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isPasswordValid = await this.userService.validatePassword(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException(
        'Credenciales inválidas',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const accessToken = await this.userService.generateJwt(user);

    // Si el usuario tiene roles, inclúyelos en la respuesta
    return {
      accessToken,
      pkUser: user.pkUser,
      roles: user.roles || [], // Ajusta según tu estructura de datos
    };
  }


  @Public()
  @ApiOperation({ summary: 'Verificar si el email existe' })
  @Get('verifyEmail')
  async verifyEmailExists(
    @Query(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    validEmailDto: VerifyEmailDto,
  ): Promise<{ exists: boolean }> {
    const exists = await this.userService.verifyEmail(validEmailDto.email);
    return { exists };
  }

  @ApiOperation({
    summary:
      'Editar datos de usuario (sin actualizar email si no se proporciona)',
  })
  @Patch('updateUserProfile')
  async update(
    @Body(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    )
    updateUserProfileDto: UpdateUserProfileDto,
  ): Promise<ReadUserDto> {
    try {
      const updatedUser =
        await this.userService.updateUser(updateUserProfileDto);
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

  @Public()
  @ApiOperation({
    summary: 'Verificar existencia de usuario por código de referido',
    description: 'Retorna email, nombre y apellido del usuario si el código existe.',
  })
  @Get('verifyReferralCode/:referralCode')
  async verifyReferralCode(
    @Param('referralCode') referralCode: string,
  ): Promise<{ email: string; firstName: string; lastName: string }> {
    if (!referralCode) {
      throw new HttpException('Código de referido es requerido', HttpStatus.BAD_REQUEST);
    }

    const userData = await this.userService.findUserByReferralCode(referralCode);

    if (!userData) {
      throw new HttpException(
        'Código de referido no encontrado o no válido',
        HttpStatus.NOT_FOUND,
      );
    }

    return userData;
  }

  @ApiOperation({ summary: 'Cambiar la contraseña de un usuario por email' })
  @Patch('reset-password')
  async resetPassword(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    resetPasswordDto: ResetPasswordDto,
  ): Promise<{ message: string }> {
    try {
      await this.userService.resetPassword(
        resetPasswordDto.email,
        resetPasswordDto.newPassword,
      );
      return { message: 'Contraseña actualizada exitosamente.' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error al cambiar la contraseña: ' + error.message,
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
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(
            new HttpException(
              'Solo se permiten archivos de imagen!',
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
        }
        cb(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
  )
  async uploadProfileImage(
    @Body(new ValidationPipe({ transform: true })) body: UploadProfileImageDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ message: string; filePath?: string }> {
    const pkUser = body.pkUser;

    if (!file) {
      throw new HttpException(
        'No se ha subido ningún archivo.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (typeof pkUser !== 'number' || pkUser <= 0 || pkUser > 1000000) {
      throw new HttpException(
        'ID de usuario inválido o fuera de rango.',
        HttpStatus.BAD_REQUEST,
      );
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
