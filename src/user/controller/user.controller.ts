import {Controller, Get, Post, Body, ValidationPipe, Param, HttpStatus, Query, HttpException} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/createUser.dto';
import { CreateUserWithEmailDto } from '../dto/createUserWithEmail.dto';
import { ReadUserDto } from "@/user/dto/readUser.dto";
import { ValidUsernameDto } from "@/user/dto/validUsername.dto";
import { VerifyEmailDto } from "@/user/dto/verifyEmail.dto";
import { ValidPhoneDto } from "@/user/dto/validPhone.dto";
import { ValidEmailDto } from "@/user/dto/validEmail.dto";
import { ApiOperation } from '@nestjs/swagger';
import { UserMapper } from "@/user/mapper/user.mapper";
import { ValidID } from "@/utils/validID";
import { UserEntity } from '../entities/user.entity';
import * as bcrypt from 'bcryptjs'; 
import { LoginWithEmailDto } from '../dto/loginWithEmail.dto';

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
 
  @ApiOperation({ summary: 'Login por Email' })
  @Post('loginWithEmail')
  async login(@Body(new ValidationPipe()) loginDto: LoginWithEmailDto): Promise<{ accessToken: string, pkUser: number}> {
    const user = await this.userService.findByEmail(loginDto.email);

    if (!user) {
      throw new HttpException('Credenciales inválidas', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await this.userService.validatePassword(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('Credenciales inválidas', HttpStatus.UNAUTHORIZED);
    }

    const accessToken = await this.userService.generateJwt(user);
    return { accessToken, pkUser: user.pkUser };
  }

}