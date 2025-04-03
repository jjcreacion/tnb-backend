import { RequestPriorityEntity } from "@/request/entities/requestPriority.entity";
import { ReadRequestPriorityDto } from "@/request/dto/requestPriority/readPriority.dto";




export class RequestPriorityMapper {
    static mapRequestPriorityEntityToReadRequestPriorityDto(
        priorityEntity: RequestPriorityEntity
    ): ReadRequestPriorityDto {
        if (!priorityEntity) {
            return new ReadRequestPriorityDto(); // or handle null case appropriately
        }

        return {
            id: priorityEntity.id,
            name: priorityEntity.name,
            description: priorityEntity.description,
            status: priorityEntity.status,
            createdAt: priorityEntity.createdAt,
            updatedAt: priorityEntity.updatedAt,
        };
    }
}
