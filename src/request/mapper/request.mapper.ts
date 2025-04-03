import {RequestEntity} from "@/request/entities/request.entity";
import {ReadRequestDto} from "@/request/dto/readRequests.dto";
import {RequestImageMapper} from "@/request/mapper/requestImage.mapper";
import {RequestLocationMapper} from "@/request/mapper/requestLocation.mapper";
import {RequestPriorityMapper} from "@/request/mapper/requestPriority.mapper";
import {PersonMapper} from "@/person/mapper/person.mapper";

export class RequestMapper {



    static  mapRequestEntityToReadRequestDto(requestEntity: RequestEntity): ReadRequestDto {
        if (!requestEntity) {
            return new ReadRequestDto() ;
        }

        let dto : ReadRequestDto = new ReadRequestDto();

        dto.id = requestEntity.id;

            dto.person = PersonMapper.entityToReadPersonDto(requestEntity.person);
            dto.dateRequest = requestEntity.dateRequest;
            dto.status = requestEntity.status;
            dto.description = requestEntity.description;
            dto.createdAt = requestEntity.createdAt;
            dto.updatedAt = requestEntity.updatedAt;
            dto.priority = RequestPriorityMapper.mapRequestPriorityEntityToReadRequestPriorityDto(requestEntity.priority);

            if(Array.isArray(requestEntity.locations)){
                dto.locations = requestEntity.locations.map(
                    RequestLocationMapper.mapRequestLocationEntityToReadRequestLocationDto
                );
            }else{
                dto.locations = requestEntity.locations;
            }

            if(Array.isArray(requestEntity.images)){
                dto.images = requestEntity.images.map(
                    RequestImageMapper.mapRequestImagesEntityToReadRequestImagesDto
                );
            }else{
                dto.images = requestEntity.images;
            }

        return dto;
    }
}
