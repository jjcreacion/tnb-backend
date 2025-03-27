import {RequestEntity} from "@/request/entities/request.entity";
import {ReadRequestDto} from "@/request/dto/readRequests.dto";
import {mapPersonEntityToReadPersonDto} from "@/person/person.mapper";
import {RequestImageMapper} from "@/request/mapper/requestImage.mapper";
import {RequestLocationMapper} from "@/request/mapper/requestLocation.mapper";
import {RequestPriorityMapper} from "@/request/mapper/requestPriority.mapper";

export class RequestMapper {

    constructor(
        private requestImageMapper : RequestImageMapper,
        private requestLocationMapper : RequestLocationMapper,
        private requestPriorityMapper : RequestPriorityMapper,
    ){}

    public  mapRequestEntityToReadRequestDto(requestEntity: RequestEntity): ReadRequestDto {
        if (!requestEntity) {
            return new ReadRequestDto() ;
        }

        let dto : ReadRequestDto = new ReadRequestDto();

        dto.id = requestEntity.id;
            dto.person = mapPersonEntityToReadPersonDto(requestEntity.person);
            dto.dateRequest = requestEntity.dateRequest;
            dto.status = requestEntity.status;
            dto.description = requestEntity.description;
            dto.createdAt = requestEntity.createdAt;
            dto.updatedAt = requestEntity.updatedAt;
            dto.priority = this.requestPriorityMapper.mapRequestPriorityEntityToReadRequestPriorityDto(requestEntity.priority);

            if(Array.isArray(requestEntity.locations)){
                dto.locations = requestEntity.locations.map(
                    this.requestLocationMapper.mapRequestLocationEntityToReadRequestLocationDto
                );
            }else{
                dto.locations = requestEntity.locations;
            }

            if(Array.isArray(requestEntity.images)){
                dto.images = requestEntity.images.map(
                    this.requestImageMapper.mapRequestImagesEntityToReadRequestImagesDto
                );
            }else{
                dto.images = requestEntity.images;
            }

        return dto;
    }
}
