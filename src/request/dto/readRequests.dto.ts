import {ReadPersonDto} from "@/person/dto/readPerson.dto";
import {ReadRequestPriorityDto} from "@/request/dto/requestPriority/readPriority.dto";
import {ReadRequestLocationDto} from "@/request/dto/requestLocation/read-location.dto";
import {ReadRequestImagesDto} from "@/request/dto/requestImages/read-images.dto";

export class ReadRequestDto {

    id: number;
    person: ReadPersonDto;
    dateRequest: Date;
    status: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    priority: ReadRequestPriorityDto;
    locations: ReadRequestLocationDto | ReadRequestLocationDto[];
    images: ReadRequestImagesDto | ReadRequestImagesDto[];

}
