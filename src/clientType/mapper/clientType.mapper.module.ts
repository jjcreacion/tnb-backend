import {Module} from "@nestjs/common";
import {CategoryMapper} from "@/category/mapper/category.mapper";
import {CategoryServiceMapper} from "@/category/mapper/services/categoryService.mapper";
import {ServicesTypeMapper} from "@/category/mapper/services/servicesType.mapper";
import {ClientTypeMapper} from "@/clientType/mapper/clientType.mapper";

@Module({
     providers:[ClientTypeMapper],
    exports:[ClientTypeMapper]
})
export class ClientTypeMapperModule{}