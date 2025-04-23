import {RequestEntity} from "@/request/entities/request.entity";
import {ReadRequestByTableDto, ReadRequestDto} from "@/request/dto/readRequests.dto";
import {RequestImageMapper} from "@/request/mapper/requestImage.mapper";
import {RequestLocationMapper} from "@/request/mapper/requestLocation.mapper";
import {RequestPriorityMapper} from "@/request/mapper/requestPriority.mapper";
import {PersonMapper} from "@/person/mapper/person.mapper";
import {actionsDto} from "@/utils/actions.dto";

export class RequestMapper {

    static  mapRequestEntityToReadTableRequest(requestEntity: RequestEntity): ReadRequestByTableDto {

        let dto : ReadRequestByTableDto = new ReadRequestByTableDto();

        dto.pkRequest = requestEntity.pkRequest;
        dto.personFullName = requestEntity.person.firstName;
        dto.personFullName +=   requestEntity.person.middleName ?  " "+requestEntity.person.middleName : ""
        dto.personFullName += requestEntity.person.lastName ?  " " + requestEntity.person.lastName : "";

        dto.creationDate = requestEntity.createdAt;
        dto.status = requestEntity.status;
        dto.description = requestEntity.description;
        dto.typePriority = requestEntity.priority.description;
        dto.actions = new actionsDto(true,true,false); // MOdificar cuando se activen las acciones segun el menu

        return dto;
    }

    static  mapRequestEntityToReadRequestDto(requestEntity: RequestEntity): ReadRequestDto {
        if (!requestEntity) {
            return new ReadRequestDto() ;
        }

        let dto : ReadRequestDto = new ReadRequestDto();

        if (requestEntity.person)dto.person = PersonMapper.entityToReadPersonDto(requestEntity.person);

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
