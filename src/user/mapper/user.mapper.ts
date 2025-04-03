import { UserEntity } from '../entities/user.entity';
import {PersonMapper} from "@/person/mapper/person.mapper";
import {ReadUserDto} from "@/user/dto/readUser.dto";
import {CreateUserDto} from "@/user/dto/createUser.dto";
import {ProfileMapper} from "@/profile/mapper/profile.mapper";

export class UserMapper {

    static entityToReadUserDto(entity: UserEntity): ReadUserDto {
        return {
            pkUser: entity.pkUser,
            person: PersonMapper.entityToReadPersonDto(entity.person),
            profile: ProfileMapper.entityToReadProfileDto(entity.profile),
            email: entity.email,
            username: entity.username,
            phone: entity.phone,
            validateEmail: entity.validateEmail,
            validatePhone: entity.validatePhone,
            status: entity.status,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }

    static createUserDtoToEntity(dto: CreateUserDto): UserEntity {
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