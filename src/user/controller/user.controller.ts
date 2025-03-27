import {Controller, Get, Post, Body, ValidationPipe, HttpStatus} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/createUser.dto';
import {ReadUserDto} from "@/user/dto/readUser.dto";
import {ValidUsernameDto} from "@/user/dto/validUsername.dto";
import {ValidPhoneDto} from "@/user/dto/validPhone.dto";
import {ValidEmailDto} from "@/user/dto/validEmail.dto";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
      createUserDto: CreateUserDto
  ): Promise<ReadUserDto> {
    return this.userService.create(createUserDto);
  }

  @Get('findAll')
  findAll() {
    return this.userService.findAll();
  }

  @Get('findBy')
  findOne(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
          validParameter : ValidUsernameDto | ValidPhoneDto | ValidEmailDto
  ):Promise<ReadUserDto> {
    return this.userService.findOneBy(validParameter);
  }

  @Get('verifyUser')
  verifyUser(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
          validParameter : ValidUsernameDto | ValidPhoneDto | ValidEmailDto
  ) : Promise<{exists:boolean , status: HttpStatus}> {
    return this.userService.verifyUser(validParameter);
  }




}
