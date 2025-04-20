import {Module} from "@nestjs/common";
import {ClientTypeMapper} from "@/client-type/mapper/clientType.mapper";

@Module({
     providers:[ClientTypeMapper],
    exports:[ClientTypeMapper]
})
export class ClientTypeMapperModule{}