// user.mapper.ts
import { PersonMapper } from '@/person/mapper/person.mapper';
import { ProfileMapper } from '@/profile/mapper/profile.mapper';
import { CreateUserDto } from '@/user/dto/createUser.dto';
import { ReadUserDto } from '@/user/dto/readUser.dto';
import { UserEntity } from '../entities/user.entity';
import { Role } from '../enums/role.enum';

export class UserMapper {

    static entityToReadUserDto(entity: UserEntity): ReadUserDto {
        const dto = new ReadUserDto();
        dto.pkUser = entity.pkUser;
        dto.email = entity.email;
        dto.username = entity.username;
        dto.phone = entity.phone;
        dto.roles = entity.roles;
        dto.validateEmail = entity.validateEmail;
        dto.validatePhone = entity.validatePhone;
        dto.status = entity.status;
        dto.img_profile = entity.img_profile;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        dto.referralCode = entity.referralCode;
        dto.balance = entity.balance;
        dto.allNotifications = entity.allNotifications;
        dto.smsNotifications = entity.smsNotifications;
              
        // Mapear relaciones opcionales
        if(entity.person) {
            dto.person = PersonMapper.entityToReadPersonDto(entity.person);
        }
        if(entity.profile) {
            dto.profile = ProfileMapper.entityToReadProfileDto(entity.profile);
        }
        
        return dto;
    }

    static createUserDtoToEntity(dto: CreateUserDto): UserEntity {
        const entity = new UserEntity();
        entity.email = dto.email;
        entity.username = dto.username;
        entity.password = dto.password;
        entity.phone = dto.phone;
        entity.roles = dto.roles || [Role.CLIENT]; // Valor por defecto
        entity.validateEmail = dto.validateEmail || 0;
        entity.validatePhone = dto.validatePhone || 0;
        entity.status = dto.status || 1;
        entity.referred_by_code = dto.referred_by_code || '';
        entity.img_profile = dto.img_profile || '';
        entity.allNotifications = dto.allNotifications ?? true;
        entity.smsNotifications = dto.smsNotifications ?? true;
        return entity;
    }
}