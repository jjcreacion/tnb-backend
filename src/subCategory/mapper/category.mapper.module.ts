import {Module} from "@nestjs/common";
import {CategoryMapper} from "@/category/mapper/category.mapper";

@Module({
     providers:[CategoryMapper],
    exports:[CategoryMapper]
})
export class CategoryMapperModule{}