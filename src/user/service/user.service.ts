import { PersonAddressEntity } from '@/person-address/entities/person-address.entity';
import { PersonPhoneEntity } from '@/person-phones/entities/person-phone.entity';
import { ReadUserDto } from '@/user/dto/readUser.dto';
import { ValidEmailDto } from '@/user/dto/validEmail.dto';
import { UserEntity } from '@/user/entities/user.entity';
import { Role } from '@/user/enums/role.enum';
import { AppSettingsEntity } from '@/app-settings/entities/app-settings.entity';
import { UserMapper } from '@/user/mapper/user.mapper';
import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { PersonEntity } from '../../person/entities/person.entity';
import { ReferralHistoryEntity } from '@/user/entities/referral-history.entity';
import { CreateUserDto } from '../dto/createUser.dto';
import { CreateUserWithEmailDto } from '../dto/createUserWithEmail.dto';
import { UpdateUserProfileDto } from '../dto/updateUserProfile.dto';
import { ReferredUserHistoryDto } from '../dto/readReferredUserHistory.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private userMapper: UserMapper,
    @InjectRepository(PersonEntity)
    private personRepository: Repository<PersonEntity>,
    @InjectRepository(PersonPhoneEntity)
    private phoneRepository: Repository<PersonPhoneEntity>,
    @InjectRepository(PersonAddressEntity)
    private addressRepository: Repository<PersonAddressEntity>,
    private readonly jwtService: JwtService,
    @InjectRepository(AppSettingsEntity)
    private appSettingsRepository: Repository<AppSettingsEntity>,
    @InjectRepository(ReferralHistoryEntity) 
    private readonly referralHistoryRepository: Repository<ReferralHistoryEntity>,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<UserEntity> {
    const entity = this.userRepository.create(createUserDto);

    // If fkPerson is provided, assign the person relationship
    if (createUserDto.fkPerson) {
      const personEntity = await this.personRepository.findOne({
        where: { pkPerson: createUserDto.fkPerson },
      });
      if (personEntity) {
        entity.person = personEntity;
      }
    }

    // Set default values for fields not provided in DTO
    entity.roles = createUserDto.roles || [Role.CLIENT];
    entity.validateEmail = createUserDto.validateEmail || 0;
    entity.validatePhone = createUserDto.validatePhone || 0;
    entity.status = createUserDto.status || 1;

    return await this.userRepository.save(entity);
  }

  // Método para generar Código Unico de referido 
  private async generateReferralCode(): Promise<string> {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const codeLength = 8;
    let referralCode = '';
    let isUnique = false;

    while (!isUnique) {
      referralCode = '';
      for (let i = 0; i < codeLength; i++) {
        referralCode += characters.charAt(
          Math.floor(Math.random() * characters.length),
        );
      }
      const existingUser = await this.userRepository.findOne({
        where: { referralCode },
      });
      if (!existingUser) {
        isUnique = true;
      }
    }
    return referralCode;
  }

//Crear usuario por email
 async createWithEmail(
  createUserWithEmailDto: CreateUserWithEmailDto,
): Promise<ReadUserDto> {
  const entity = this.userRepository.create(createUserWithEmailDto);

  // Establecer relaciones opcionales si se proporcionan
  if (createUserWithEmailDto.fkPerson) {
    entity.person = {
      pkPerson: createUserWithEmailDto.fkPerson,
    } as PersonEntity;
  }

  // Hash de la contraseña
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(entity.password, salt);
  entity.password = hashedPassword;

  // Establecer valores por defecto si no se proporcionan
  entity.roles = createUserWithEmailDto.roles || [Role.CLIENT];
  entity.validateEmail = createUserWithEmailDto.validateEmail || 0;
  entity.validatePhone = createUserWithEmailDto.validatePhone || 0;
  entity.status = createUserWithEmailDto.status || 1;

  // Generar código para referir y asignarlo antes de guardar
  entity.referralCode = await this.generateReferralCode();
  
  let rewardAmount = 0;
  let referringUser: UserEntity | null = null;
  
  if (entity.referred_by_code) {
    referringUser = await this.userRepository.findOne({
      where: { referralCode: entity.referred_by_code },
    });

    if (referringUser) {
      const rewardSetting = await this.appSettingsRepository.findOne({
        where: { key: 'referral_reward_amount' },
      });

      if (rewardSetting && rewardSetting.value) {
        rewardAmount = parseFloat(rewardSetting.value);
        if (!isNaN(rewardAmount) && rewardAmount > 0) {
          // Sumar recompensa al usuario referido
          entity.balance = (entity.balance || 0) + rewardAmount;

          // Sumar recompensa al usuario que refirió
          referringUser.balance = parseFloat(referringUser.balance as any || 0) + rewardAmount;
          await this.userRepository.save(referringUser); 
        }
      }
    }
  }

  const savedUser = await this.userRepository.save(entity);
  
  if (referringUser && rewardAmount > 0) {
      const historyEntity = this.referralHistoryRepository.create({
          referrerUserId: referringUser.pkUser,
          referredUserId: savedUser.pkUser,
          rewardAmount: rewardAmount,
      });
      await this.referralHistoryRepository.save(historyEntity);
  }

  return UserMapper.entityToReadUserDto(savedUser);
}

  async findAll(): Promise<ReadUserDto[]> {
    const responseUsers = await this.userRepository.find({
      relations: [
        'person',
        'person.emails',
        'person.phones',
        'person.addresses',
        'profile',
      ],
    });
    return responseUsers.map((user) => UserMapper.entityToReadUserDto(user));
  }

  async findOneBy(id: number): Promise<ReadUserDto> {
    const userEntity = await this.userRepository.findOne({
      where: { pkUser: id },
      relations: [
        'person',
        'person.emails',
        'person.phones',
        'person.addresses',
        'profile',
      ],
    });

    if (!userEntity) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    const readUserDto = UserMapper.entityToReadUserDto(userEntity);
    return readUserDto;
  }

  async verifyUserWithEmail(
    validParameter: ValidEmailDto,
  ): Promise<{ exists: boolean; status: HttpStatus; pkUser?: number }> {
    let foundUser: UserEntity | null = null;

    if (validParameter instanceof ValidEmailDto) {
      foundUser = await this.userRepository.findOneBy({
        email: validParameter.email,
      });
    }

    if (!foundUser) {
      return {
        exists: false,
        status: HttpStatus.NOT_FOUND,
      };
    }

    return {
      exists: true,
      status: HttpStatus.FOUND,
      pkUser: foundUser.pkUser,
    };
  }

  async verifyEmail(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });
    return !!user;
  }

  async findOneWithUser(pkUser: number): Promise<ReadUserDto> {
    const entity = await this.userRepository.findOne({
      where: { pkUser: pkUser },
      relations: ['addons'],
    });
    if (!entity) {
      throw new HttpException(
        `Request with ID ${pkUser} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return UserMapper.entityToReadUserDto(entity);
  }

async findUserByReferralCode(referralCode: string): Promise<{
    email: string;
    firstName: string;
    lastName: string;
  } | null> {
    const userEntity = await this.userRepository.findOne({
      where: { referralCode },
      relations: ['person'], // Para cargar los datos de la persona
    });

    if (!userEntity) {
      return null;
    }

    if (!userEntity.person) {
      throw new NotFoundException(
        `Person data not found for user with referral code ${referralCode}`,
      );
    }

    return {
      email: userEntity.email,
      firstName: userEntity.person.firstName,
      lastName: userEntity.person.lastName,
    };
  }

 //Buscar Referidos
  async findReferredUsers(referrerId: number): Promise<ReferredUserHistoryDto[]> {
    const historyRecords = await this.referralHistoryRepository.find({
      where: { referrerUserId: referrerId },
      relations: ['referredUser', 'referredUser.person'], 
    });

    if (!historyRecords || historyRecords.length === 0) {
      return []; 
    }

    return historyRecords.map(record => {
      const referredUser = record.referredUser;
      const person = referredUser.person;

      if (!person) {
        console.warn(`Persona no encontrada para el usuario referido ID: ${referredUser.pkUser}`);
        return {
          referredFullName: `Usuario ID ${referredUser.pkUser} (Datos Personales Faltantes)`,
          rewardAmount: record.rewardAmount,
          referredAt: record.referredAt,
        };
      }

      const referredFullName = `${person.firstName} ${person.lastName}`;

      return {
        referredFullName,
        rewardAmount: record.rewardAmount,
        referredAt: record.referredAt,
      };
    });
  }


  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { email } });
    //    return this.userRepository.findOne({
    //   where: { email },
    //   select: ['pkUser', 'email', 'password', 'roles'] //
    // });
  }

  async validatePassword(
    password: string,
    hashedPasswordFromDb: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPasswordFromDb);
  }

  async generateJwt(user: UserEntity): Promise<string> {
    const payload = { sub: user.pkUser, email: user.email, roles: user.roles };
    return this.jwtService.signAsync(payload);
  }

  async updateProfileImagePath(
    pkUser: number,
    imagePath: string,
  ): Promise<void> {
    const user = await this.userRepository.findOne({ where: { pkUser } });

    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    user.img_profile = imagePath;
    await this.userRepository.save(user);
  }

  async resetPassword(email: string, newPasswordPlain: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado.');
    }

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(newPasswordPlain, salt);

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
      throw new NotFoundException(
        `Persona asociada al usuario ${pkUser} no encontrada.`,
      );
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
            existingPhone.isPrimary =
              phoneDto.isPrimary ?? existingPhone.isPrimary;
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
            existingAddress.isPrimary =
              addressDto.isPrimary ?? existingAddress.isPrimary;
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
      relations: [
        'person',
        'person.emails',
        'person.phones',
        'person.addresses',
      ],
    });

    return updatedUser as unknown as ReadUserDto;
  }
}
