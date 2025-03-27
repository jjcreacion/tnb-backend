import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {In, Repository} from "typeorm";
import {RequestImageEntity} from "@/request/entities/requestImages.entity";


@Injectable()
export class RequestImagesService {

    constructor(
        @InjectRepository(RequestImageEntity) private requestImageRepository: Repository<RequestImageEntity>,
    ){}

    async findImageById(idOrIds: number | number[]): Promise<RequestImageEntity | RequestImageEntity[]> {

        if (Array.isArray(idOrIds)) {
            const images = await this.requestImageRepository.findBy({ id: In(idOrIds) });
            if (!images) {
                throw new NotFoundException('Some images not found');
            }
            return images;
        } else {
            const image = await this.requestImageRepository.findOneBy({ id: idOrIds });
            if (!image) {
                throw new NotFoundException('image not found');
            }
            return image;
        }
    }


}