import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateUserWithEmailDto } from '../dto/createUserWithEmail.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserEntity} from "@/user/entities/user.entity";
import {UserMapper} from "@/user/mapper/user.mapper";
import {ReadUserDto} from "@/user/dto/readUser.dto";
import {ValidUsernameDto} from "@/user/dto/validUsername.dto";
import {ValidPhoneDto} from "@/user/dto/validPhone.dto";
import {ValidEmailDto} from "@/user/dto/validEmail.dto";
import { PersonEntity } from '../../person/entities/person.entity'; 
import * as bcrypt from 'bcryptjs'; 


@Injectable()
export class UserService {

  constructor(
      @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
      private userMapper : UserMapper,
      @InjectRepository(PersonEntity) private personRepository: Repository<PersonEntity>, 
  
  ){}

  async createWithEmail(createUserWithEmailDto: CreateUserWithEmailDto): Promise<ReadUserDto> {
    const entity = this.userRepository.create(createUserWithEmailDto);
  
    entity.person = { pkPerson: createUserWithEmailDto.fkPerson } as PersonEntity;
    
    const salt = await bcrypt.genSalt(); 
    const hashedPassword = await bcrypt.hash(entity.password, salt);
    entity.password = hashedPassword;
  
    const savedUser = await this.userRepository.save(entity);
    return UserMapper.entityToReadUserDto(savedUser);
  }

  async findAll(): Promise<ReadUserDto[]> {
    const responseUsers = await this.userRepository.find({
      relations: ['person', 'person.emails', 'person.phones', 'person.addresses'],
    });
    return responseUsers.map((user) => UserMapper.entityToReadUserDto(user));
  }

  async findOneBy(id: number): Promise<ReadUserDto> {
    const userEntity = await this.userRepository.findOne({
      where: { pkUser: id }, 
      relations: ['person', 'person.emails', 'person.phones', 'person.addresses', 'profile'], 
    });

    if (!userEntity) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    const readUserDto = UserMapper.entityToReadUserDto(userEntity);
    return readUserDto; 
  }

  /*
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

    async findOneWithUser (pkUser: number):Promise<ReadUserDto>{
      const entity = await this.userRepository.findOne({
        where: {pkUser:pkUser},
            relations : ['addons']
      })
      if(!entity){throw new HttpException(`Request with ID ${pkUser} not found`, HttpStatus.NOT_FOUND);}
  
      return UserMapper.entityToReadUserDto(entity)
    }
*/  

}
