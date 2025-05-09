// user.mapper.ts
import { UserEntity } from '../entities/user.entity';
import { PersonMapper } from '@/person/mapper/person.mapper';
import { ReadUserDto } from '@/user/dto/readUser.dto';
import { CreateUserDto } from '@/user/dto/createUser.dto';

export class UserMapper {

    static entityToReadUserDto(entity: UserEntity): ReadUserDto {
        const dto = new ReadUserDto();
        dto.pkUser = entity.pkUser;
        dto.email = entity.email;
        dto.username = entity.username;
        dto.phone = entity.phone;
        dto.validateEmail = entity.validateEmail;
        dto.validatePhone = entity.validatePhone;
        dto.status = entity.status;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        if(entity.person) dto.person = PersonMapper.entityToReadPersonDto(entity.person);
        return dto;
    }

    static readUserDtoToEntity(dto: CreateUserDto): UserEntity {
        const entity = new UserEntity();
        entity.email = dto.email;
        entity.username = dto.username;
        entity.password = dto.password;
        entity.phone = dto.phone;
        entity.validateEmail = dto.validateEmail;
        entity.validatePhone = dto.validatePhone;
        entity.status = dto.status;
        return entity;
    }
}