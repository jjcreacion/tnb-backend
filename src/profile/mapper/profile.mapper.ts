
import { ProfileEntity } from '../entities/profile.entity';
import {ReadProfileDto} from "@/profile/dto/readProfile.dto";
import {CreateProfileDto} from "@/profile/dto/createProfile.dto";

export class ProfileMapper {
    static entityToReadProfileDto(entity: ProfileEntity): ReadProfileDto {
        return {
            pkProfile: entity.pkProfile,
            name: entity.name,
            alias: entity.alias,
            description: entity.description,
            phone: entity.phone,
            phoneExtension: entity.phoneExtension,
            address: entity.address,
            zipCode: entity.zipCode,
            industry: entity.industry,
            source: entity.source,
            urlProfileImage: entity.urlProfileImage,
            urlBannerImage: entity.urlBannerImage,
            status: entity.status,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }

    static createProfileDtoToEntity(dto: CreateProfileDto): ProfileEntity {
        const entity = new ProfileEntity();
        entity.name = dto.name;
        entity.alias = dto.alias;
        entity.description = dto.description;
        entity.phone = dto.phone;
        entity.phoneExtension = dto.phoneExtension;
        entity.address = dto.address;
        entity.zipCode = dto.zipCode;
        entity.industry = dto.industry;
        entity.source = dto.source;
        entity.urlProfileImage = dto.urlProfileImage;
        entity.urlBannerImage = dto.urlBannerImage;
        entity.status = dto.status;
        return entity;
    }
}