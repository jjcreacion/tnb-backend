import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {In, Repository} from "typeorm";
import {RequestLocationEntity} from "@/request/entities/requestLocation.entity";


@Injectable()
export class RequestLocationService {

    constructor(
        @InjectRepository(RequestLocationEntity) private requestLocationRepository: Repository<RequestLocationEntity>,
    ){}

    async findLocationById(idOrIds: number | number[]): Promise<RequestLocationEntity | RequestLocationEntity[]> {

        if (Array.isArray(idOrIds)) {
            const locations = await this.requestLocationRepository.findBy({ id: In(idOrIds) });
            if (!locations) {
                throw new NotFoundException('Some locations not found');
            }
            return locations;
        } else {
            const location = await this.requestLocationRepository.findOneBy({ id: idOrIds });
            if (!location) {
                throw new NotFoundException('Location not found');
            }
            return location;
        }
    }


}