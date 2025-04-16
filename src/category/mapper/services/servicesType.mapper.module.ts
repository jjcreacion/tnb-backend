import {Module} from "@nestjs/common";
import {CategoryMapper} from "@/category/mapper/category.mapper";
import {CategoryServiceMapper} from "@/category/mapper/services/categoryService.mapper";
import {ServicesTypeMapper} from "@/category/mapper/services/servicesType.mapper";

@Module({
     providers:[ServicesTypeMapper],
    exports:[ServicesTypeMapper]
})
export class ServicesTypeMapperModule{}