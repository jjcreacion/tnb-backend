import { RequestLocationEntity } from "@/request/entities/requestLocation.entity";
import { ReadRequestLocationDto } from "@/request/dto/requestLocation/read-location.dto";



export class RequestLocationMapper {
    static mapRequestLocationEntityToReadRequestLocationDto(
        locationEntity: RequestLocationEntity
    ): ReadRequestLocationDto {
        if (!locationEntity) {
            return new ReadRequestLocationDto();
        }

        return {
            id: locationEntity.id,
            urlGoogleMap: locationEntity.urlGoogleMap,
            latitude: locationEntity.latitude,
            longitude: locationEntity.longitude,
            status: locationEntity.status,
            createdAt: locationEntity.createdAt,
            updatedAt: locationEntity.updatedAt,
        };
    }
}
