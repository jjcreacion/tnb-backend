import {Controller, Get, Post, Body, ValidationPipe, Param, HttpStatus} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/createUser.dto';
import { CreateUserWithEmailDto } from '../dto/createUserWithEmail.dto';
import {ReadUserDto} from "@/user/dto/readUser.dto";
import {ValidUsernameDto} from "@/user/dto/validUsername.dto";
import {ValidPhoneDto} from "@/user/dto/validPhone.dto";
import {ValidEmailDto} from "@/user/dto/validEmail.dto";
import { ApiOperation } from '@nestjs/swagger';
import { UserMapper } from "@/user/mapper/user.mapper";
import {ValidID} from "@/utils/validID";
import { UserEntity } from '../entities/user.entity';

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

  @ApiOperation({ summary: 'Listar persona por Id' })
  @Get('findOne/:id')
  async findOne(@Param("id") id : number) : Promise<ReadUserDto> {
    const responseDto = await this.userService.findOneBy(id);
    return responseDto;
  }
/*
  @Get('verifyUser')
  verifyUser(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
          validParameter : ValidUsernameDto | ValidPhoneDto | ValidEmailDto
  ) : Promise<{exists:boolean , status: HttpStatus}> {
    return this.userService.verifyUser(validParameter);
  }

*/


}
