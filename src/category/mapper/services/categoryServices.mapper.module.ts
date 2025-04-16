import {Module} from "@nestjs/common";
import {CategoryMapper} from "@/category/mapper/category.mapper";
import {CategoryServiceMapper} from "@/category/mapper/services/categoryService.mapper";

@Module({
     providers:[CategoryServiceMapper],
    exports:[CategoryServiceMapper]
})
export class CategoryServicesMapperModule{}