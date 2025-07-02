import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import { CreateUserWithEmailDto } from '../dto/createUserWithEmail.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserEntity} from "@/user/entities/user.entity";
import {UserMapper} from "@/user/mapper/user.mapper";
import {ReadUserDto} from "@/user/dto/readUser.dto";
import {ValidEmailDto} from "@/user/dto/validEmail.dto";
import { PersonEntity } from '../../person/entities/person.entity'; 
import * as bcrypt from 'bcryptjs'; 
import { JwtService } from '@nestjs/jwt';
import { PersonPhoneEntity } from '@/person-phones/entities/person-phone.entity'; 
import { PersonAddressEntity } from '@/person-address/entities/person-address.entity';
import { UpdateUserProfileDto } from '../dto/updateUserProfile.dto';

@Injectable()
export class UserService {

  constructor(
      @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
      private userMapper : UserMapper,
      @InjectRepository(PersonEntity) private personRepository: Repository<PersonEntity>, 
      @InjectRepository(PersonPhoneEntity) private phoneRepository: Repository<PersonPhoneEntity>,
      @InjectRepository(PersonAddressEntity) private addressRepository: Repository<PersonAddressEntity>,
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

   async verifyEmail(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });
    return !!user;
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

  async updateProfileImagePath(pkUser: number, imagePath: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { pkUser } });

    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    user.img_profile = imagePath;
    await this.userRepository.save(user); 
  }

  async updateUser(updateUserProfileDto: UpdateUserProfileDto ): Promise<ReadUserDto> {
    const { pkUser, email, person } = updateUserProfileDto;

    const user = await this.userRepository.findOne({
      where: { pkUser: pkUser },
      relations: ['person', 'person.phones', 'person.addresses'],
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${pkUser} no encontrado.`);
    }

    if (!user.person) {
      throw new NotFoundException(`Persona asociada al usuario ${pkUser} no encontrada.`);
    }

    if (email) {
      user.email = email;
      await this.userRepository.save(user);
    }

    if (person) {
      const { firstName, lastName, phones, addresses } = person;

      if (firstName) {
        user.person.firstName = firstName;
      }
      if (lastName) {
        user.person.lastName = lastName;
      }
      await this.personRepository.save(user.person);

      if (phones && phones.length > 0) {
        for (const phoneDto of phones) {
          if (phoneDto.isPrimary === 1) {
            await this.phoneRepository.update(
              { person: user.person, isPrimary: 1 },
              { isPrimary: 0 },
            );
          }
          let existingPhone = await this.phoneRepository.findOne({
            where: { phone: phoneDto.phone, person: user.person },
          });

          if (existingPhone) {
            existingPhone.isPrimary = phoneDto.isPrimary ?? existingPhone.isPrimary;
            await this.phoneRepository.save(existingPhone);
          } else if (phoneDto.phone) {
            const newPhone = this.phoneRepository.create({
              ...phoneDto,
              person: user.person,
              status: 1,
            });
            await this.phoneRepository.save(newPhone);
          }
        }
      }

      if (addresses && addresses.length > 0) {
        for (const addressDto of addresses) {
          if (addressDto.isPrimary === 1) {
            await this.addressRepository.update(
              { person: user.person, isPrimary: 1 },
              { isPrimary: 0 },
            );
          }
          let existingAddress = await this.addressRepository.findOne({
            where: { address: addressDto.address, person: user.person },
          });

          if (existingAddress) {
            existingAddress.isPrimary = addressDto.isPrimary ?? existingAddress.isPrimary;
            await this.addressRepository.save(existingAddress);
          } else if (addressDto.address) {
            const newAddress = this.addressRepository.create({
              ...addressDto,
              person: user.person,
              status: 1,
            });
            await this.addressRepository.save(newAddress);
          }
        }
      }
    }

    const updatedUser = await this.userRepository.findOne({
      where: { pkUser: pkUser },
      relations: ['person', 'person.emails', 'person.phones', 'person.addresses'],
    });

    return updatedUser as unknown as ReadUserDto;
  }

}
