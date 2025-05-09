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
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UserService {

  constructor(
      @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
      private userMapper : UserMapper,
      @InjectRepository(PersonEntity) private personRepository: Repository<PersonEntity>, 
      private readonly jwtService: JwtService
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

  
  async verifyUserWithEmail(validParameter: ValidEmailDto): Promise<{ exists: boolean, status: HttpStatus, pkUser?: number }> {
    let foundUser: UserEntity | null = null;

    if (validParameter instanceof ValidEmailDto) {
      foundUser = await this.userRepository.findOneBy({
        email: validParameter.email
      });
    }
   
    if (!foundUser) {
      return {
        exists: false,
        status: HttpStatus.NOT_FOUND
      };
    }

    return {
      exists: true,
      status: HttpStatus.FOUND,
      pkUser: foundUser.pkUser
    };
  }

  async findOneWithUser (pkUser: number):Promise<ReadUserDto>{
    const entity = await this.userRepository.findOne({
      where: {pkUser:pkUser},
          relations : ['addons']
    })
    if(!entity){throw new HttpException(`Request with ID ${pkUser} not found`, HttpStatus.NOT_FOUND);}

    return UserMapper.entityToReadUserDto(entity)
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async validatePassword(password: string, hashedPasswordFromDb: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPasswordFromDb);
  }

  async generateJwt(user: UserEntity): Promise<string> {
    const payload = { sub: user.pkUser, email: user.email }; 
    return this.jwtService.signAsync(payload);
  }

}
