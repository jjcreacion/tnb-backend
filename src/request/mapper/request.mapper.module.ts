import {Module} from "@nestjs/common";
import {RequestMapper} from "@/request/mapper/request.mapper";
import {RequestImageMapper} from "@/request/mapper/requestImage.mapper";
import {RequestLocationMapper} from "@/request/mapper/requestLocation.mapper";
import {RequestPriorityMapper} from "@/request/mapper/requestPriority.mapper";


@Module({
    providers:[
        RequestMapper,
        RequestImageMapper,
        RequestLocationMapper,
        RequestPriorityMapper
    ],
    exports:[
        RequestMapper,
        RequestImageMapper,
        RequestLocationMapper,
        RequestPriorityMapper
    ]
})
export class RequestMapperModule {}