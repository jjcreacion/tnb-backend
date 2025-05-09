import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateProfileDto } from './dto/createProfile.dto';
import { UpdateProfileDto } from './dto/updateProfile.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ProfileEntity} from "@/profile/entities/profile.entity";
import {ProfileMapper} from "@/profile/mapper/profile.mapper";
import {ReadProfileDto} from "@/profile/dto/readProfile.dto";
import {ValidPkUserDto} from "@/user/dto/validPkUser.dto";
import {UserService} from "@/user/service/user.service";

@Injectable()
export class ProfileService {

  constructor(
      @InjectRepository(ProfileEntity) private profileRepository: Repository<ProfileEntity>,
      private userService : UserService,
  ){}

  async create(createProfileDto: CreateProfileDto) : Promise<ReadProfileDto> {
    return ProfileMapper.entityToReadProfileDto(
        await this.profileRepository.save(
            this.profileRepository.create(createProfileDto)
        )
    )
  }

  async findAll(): Promise <ReadProfileDto[]> {
    return await this.profileRepository.find()
        .then( profiles =>
         profiles.map(
             (profile) => ProfileMapper.entityToReadProfileDto(profile)
        ));
  }

 /* async findOneByFkUser(validParameter : ValidPkUserDto):Promise<ReadProfileDto> {
    const foundUser = await this.userService.findOneBy(validParameter);
    if(!foundUser){ throw new HttpException( 'User notFound', HttpStatus.NOT_FOUND); }

    const foundProfile = await this.profileRepository.findOneBy({
      user : foundUser
    })

    if(!foundProfile){ throw new HttpException( 'Profile notFound', HttpStatus.NOT_FOUND); }

    return foundProfile;
  }*/


}
