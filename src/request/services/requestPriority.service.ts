import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {In, Repository} from "typeorm";
import {RequestPriorityEntity} from "@/request/entities/requestPriority.entity";


@Injectable()
export class RequestPriorityService {

    constructor(
        @InjectRepository(RequestPriorityEntity) private requestPriorityRepository: Repository<RequestPriorityEntity>,
    ){}

    async findPriorityById(idOrIds: number): Promise<RequestPriorityEntity> {

        const priority = await this.requestPriorityRepository.findOneBy({id: idOrIds});
        if (!priority) {
            throw new NotFoundException('Priority not found');
        }
        return priority;

    }


}