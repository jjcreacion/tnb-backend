import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateUserDto } from '../dto/createUser.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserEntity} from "@/user/entities/user.entity";
import {UserMapper} from "@/user/mapper/user.mapper";
import {ReadUserDto} from "@/user/dto/readUser.dto";
import {ValidUsernameDto} from "@/user/dto/validUsername.dto";
import {ValidPhoneDto} from "@/user/dto/validPhone.dto";
import {ValidEmailDto} from "@/user/dto/validEmail.dto";
import {ValidPkUserDto} from "@/user/dto/validPkUser.dto";

@Injectable()
export class UserService {

  constructor(
      @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
      private userMapper : UserMapper
  ){}

  async create(createUserDto: CreateUserDto) : Promise<ReadUserDto>  {
    const entity = this.userRepository.create(createUserDto);
    return this.userMapper.entityToReadUserDto(
        await this.userRepository.save(entity)
    );
  }

  async findAll() : Promise<ReadUserDto[]> {
    const responseUsers = await this.userRepository.find();
    return responseUsers.map( (user) =>
      this.userMapper.entityToReadUserDto(user)
    );
  }

  async findOneBy(validParameter : ValidUsernameDto | ValidPhoneDto | ValidEmailDto | ValidPkUserDto ) {

    let foundUser : true | false | null | UserEntity  ;
    let responseObject = {
      exists : false,
      status: HttpStatus.NOT_FOUND
    }

    if(validParameter instanceof ValidUsernameDto){
       foundUser = await this.userRepository.findOneBy({
        username : validParameter.username
      });
    }else if(validParameter instanceof ValidEmailDto){
       foundUser = await this.userRepository.findOneBy({
        email : validParameter.email
      });
    }else if(validParameter instanceof ValidPhoneDto){
       foundUser = await this.userRepository.findOneBy({
        phone : validParameter.phone
      });
    }else{
        foundUser = await this.userRepository.findOneBy({
            pkUser : validParameter.pkUser
        });
    }

    if(!foundUser){ throw new HttpException( responseObject, HttpStatus.NOT_FOUND); }


    return this.userMapper.entityToReadUserDto(foundUser);


  }

  async verifyUser(validParameter : ValidUsernameDto | ValidPhoneDto | ValidEmailDto ) {

    let foundUser : true | false | null | UserEntity  ;

    let responseObject = {
      exists : false,
      status: HttpStatus.NOT_FOUND
    }


    if(validParameter instanceof ValidUsernameDto){
       foundUser = await this.userRepository.findOneBy({
        username : validParameter.username
      });
    }else if(validParameter instanceof ValidEmailDto){
       foundUser = await this.userRepository.findOneBy({
        email : validParameter.email
      });
    }else{
       foundUser = await this.userRepository.findOneBy({
        phone : validParameter.phone
      });
    }

    if(!foundUser){ return responseObject }

    responseObject.exists = true;
    responseObject.status = HttpStatus.FOUND;

    return responseObject;


  }

}
