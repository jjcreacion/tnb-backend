import { RequestImageEntity } from "@/request/entities/requestImages.entity";
import { ReadRequestImagesDto } from "@/request/dto/requestImages/read-images.dto";



export class RequestImageMapper {
    public mapRequestImagesEntityToReadRequestImagesDto(
        imageEntity: RequestImageEntity
    ): ReadRequestImagesDto  {
        if (!imageEntity) {
            return new ReadRequestImagesDto();
        }

        return {
            id: imageEntity.id,
            urlImage: imageEntity.urlImage,
            status: imageEntity.status,
            createdAt: imageEntity.createdAt,
            updatedAt: imageEntity.updatedAt,
        };
    }
}
