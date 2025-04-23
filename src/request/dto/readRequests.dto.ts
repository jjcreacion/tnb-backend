import {ReadPersonDto} from "@/person/dto/readPerson.dto";
import {ReadRequestPriorityDto} from "@/request/dto/requestPriority/readPriority.dto";
import {ReadRequestLocationDto} from "@/request/dto/requestLocation/read-location.dto";
import {ReadRequestImagesDto} from "@/request/dto/requestImages/read-images.dto";
import {actionsDto} from "@/utils/actions.dto";

export class ReadRequestDto {

    pkRequest: number;
    dateRequest: Date;
    status: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    person: ReadPersonDto;
    priority: ReadRequestPriorityDto;
    locations: ReadRequestLocationDto | ReadRequestLocationDto[];
    images: ReadRequestImagesDto | ReadRequestImagesDto[];

}
export class ReadRequestByTableDto {
    pkRequest: number;
    personFullName : string;
    creationDate : Date;
    status : string;
    description : string;
    typePriority : string;
    actions: actionsDto;
}