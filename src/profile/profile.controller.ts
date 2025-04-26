import {Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/createProfile.dto';
import { UpdateProfileDto } from './dto/updateProfile.dto';
import {ReadProfileDto} from "@/profile/dto/readProfile.dto";
import {ValidPkUserDto} from "@/user/dto/validPkUser.dto";

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  create(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
          createProfileDto: CreateProfileDto
  ): Promise<ReadProfileDto> {
    return this.profileService.create(createProfileDto);
  }

  @Get('findAll')
  findAll(): Promise<ReadProfileDto[]> {
    return this.profileService.findAll();
  }

  @Get(':findOneByFkUser')
  findOneByFkUser(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
      validParameter : ValidPkUserDto
  ):Promise<ReadProfileDto> {
    return this.profileService.findOneByFkUser(validParameter);
  }

}
